use std::sync::Arc;
use penumbra_keys::FullViewingKey;
use penumbra_keys::keys::SpendKey;
use penumbra_view::ViewServer;
use tauri::Manager;
use tauri::async_runtime::Mutex;

mod view_server;

struct AppState {
    view_server: Option<Arc<ViewServer>>,
    spend_key: Option<Arc<SpendKey>>,
    full_viewing_key: Option<Arc<FullViewingKey>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                view_server: None,
                spend_key: None,
                full_viewing_key: None,
            }));
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            view_server::is_connected,
            view_server::get_block_height,
            view_server::generate_keys,
            view_server::get_address_by_index,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
