use std::ops::Deref;
use std::str::FromStr;
use std::sync::Arc;
use penumbra_keys::FullViewingKey;
use penumbra_keys::keys::{Bip44Path, SeedPhrase, SpendKey};
use penumbra_view::ViewServer;
use penumbra_proto::view::v1::view_service_server::ViewServiceServer;
use tauri::State;
use tauri::async_runtime::Mutex;

const ENDPOINT: &str = "https://testnet.plinfra.net";

#[tauri::command]
pub async fn is_connected(state: State<'_, Mutex<crate::AppState>>) -> Result<bool, String> {
    match state.lock().await.spend_key {
        Some(_) => Ok(true),
        None => Ok(false),
    }
}

#[tauri::command]
pub async fn generate_keys(state: State<'_, Mutex<crate::AppState>>, seed_phrase: &str) -> Result<bool, String> {
    let seed = match SeedPhrase::from_str(seed_phrase) {
        Ok(seed) => seed,
        Err(e) => return Err(format!("Error parsing seed phrase: {}", e)),
    };
    let path = Bip44Path::new(0);

    let spend_key: Arc<SpendKey> = Arc::new(SpendKey::from_seed_phrase_bip44(seed, &path));
    let full_viewing_key: Arc<FullViewingKey> = Arc::new(spend_key.full_viewing_key().clone());

    let view_server = match ViewServer::load_or_initialize(
        None::<&str>,
        None::<&str>,
        &full_viewing_key,
        ENDPOINT.parse().unwrap(),
    ).await {
        Ok(vs) => Arc::new(vs),
        Err(e) => return Err(format!("Error initializing view server: {}", e)),
    };

    let mut state = state.lock().await;
    state.spend_key = Some(spend_key.clone());
    state.full_viewing_key = Some(full_viewing_key.clone());
    state.view_server = Some(view_server.clone());
    
    tokio::spawn(async move {
        let vs_tonic = ViewServiceServer::from_arc(view_server.clone());
        let server = tonic::transport::Server::builder()
            .accept_http1(true)
            .add_service(tonic_web::enable(vs_tonic))
            .serve("127.0.0.1:3333".parse().unwrap());
    
        if let Err(e) = server.await {
            Err(format!("Error running tonic server: {}", e))
        } else { 
            Ok(())
        }
    });
    
    Ok(true)
}

#[tauri::command]
pub async fn get_block_height(state: State<'_, Mutex<crate::AppState>>) -> Result<u64, String> {
    let view_server = match &state.lock().await.view_server {
        Some(vs) => vs.deref().clone(),
        None => {
            return Err("View server not initialized".to_string());
        }
    };
    
    let block_height = match view_server.latest_known_block_height().await {
        Ok(height) => {
            println!("Block height: {}", height.0);
            height.0
        }
        Err(e) => {
            return Err(format!("Error querying block height: {}", e));
        }
    };

    Ok(block_height)
}

