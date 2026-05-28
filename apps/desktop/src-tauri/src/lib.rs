use tauri::{Emitter, menu::{MenuBuilder, SubmenuBuilder, MenuItemBuilder}};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let settings = MenuItemBuilder::with_id("open-settings", "Settings...").accelerator("CmdOrCtrl+,").build(app)?;
            
            #[cfg(target_os = "macos")]
            let menu = {
                let app_submenu = SubmenuBuilder::new(app, "App")
                    .about(None)
                    .separator()
                    .item(&settings)
                    .separator()
                    .services()
                    .separator()
                    .hide()
                    .hide_others()
                    .show_all()
                    .separator()
                    .quit()
                    .build()?;
                let edit_submenu = SubmenuBuilder::new(app, "Edit")
                    .undo()
                    .redo()
                    .separator()
                    .cut()
                    .copy()
                    .paste()
                    .select_all()
                    .build()?;
                MenuBuilder::new(app)
                    .item(&app_submenu)
                    .item(&edit_submenu)
                    .build()?
            };

            #[cfg(not(target_os = "macos"))]
            let menu = {
                let file_submenu = SubmenuBuilder::new(app, "File")
                    .item(&settings)
                    .separator()
                    .quit()
                    .build()?;
                MenuBuilder::new(app)
                    .item(&file_submenu)
                    .build()?
            };

            app.set_menu(menu)?;

            app.on_menu_event(move |app_handle, event| {
                if event.id().0 == "open-settings" {
                    let _ = app_handle.emit("open-settings", ());
                }
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
