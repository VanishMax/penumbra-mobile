use std::str::FromStr;
use penumbra_keys::keys::{Bip44Path, SeedPhrase, SpendKey};
use penumbra_view::ViewServer;
use penumbra_proto::DomainType;
use tauri::{AppHandle, Manager, State};
use tauri::async_runtime::Mutex;

const ENDPOINT: &str = "https://testnet.plinfra.net";

#[tauri::command]
pub async fn generate_keys(app_handle: AppHandle, seed_phrase: &str) -> Result<(Vec<u8>, Vec<u8>), String> {
    let seed = match SeedPhrase::from_str(seed_phrase) {
        Ok(seed) => seed,
        Err(e) => return Err(format!("Error parsing seed phrase: {}", e)),
    };
    let path = Bip44Path::new(0);

    let spend_key = SpendKey::from_seed_phrase_bip44(seed, &path);
    let fvk = spend_key.full_viewing_key();
    
    app_handle.manage(crate::AppState {
        spend_key: spend_key.clone(),
        full_viewing_key: fvk.clone(),
        view_server: match ViewServer::load_or_initialize(
            None::<&str>,
            None::<&str>,
            &fvk,
            ENDPOINT.parse().unwrap(),
        ).await {
            Ok(vs) => vs,
            Err(e) => return Err(format!("Error initializing view server: {}", e)),
        },
    });
    
    Ok((
        spend_key.encode_to_vec(),
        fvk.encode_to_vec(),
    ))
}

#[tauri::command]
pub async fn get_block_height(state: State<'_, Mutex<crate::AppState>>) -> Result<u64, String> {
    let view_server = &state.lock().await.view_server;
    
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

