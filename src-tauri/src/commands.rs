// use glob::glob;
use local_ip_address::local_ip;
use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};
extern crate dirs;

#[derive(Debug, Serialize, Deserialize)]
pub struct CommandData<T> {
    data: Option<T>,
    message: String,
    status: bool,
}

impl<T> Default for CommandData<T> {
    fn default() -> Self {
        Self {
            data: None::<T>,
            message: String::from("returned data form core"),
            status: true,
        }
    }
}

impl<T> CommandData<T> {
    fn new(message: &str, status: bool, data: T) -> Self {
        Self {
            data: Some(data),
            message: message.to_string(),
            status,
        }
    }
}
// get the ip address of the machine
#[tauri::command]
pub fn get_ip_addr() -> String {
    local_ip().unwrap().to_string()
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// get the audio file form the default audio dir of the OS
// return an instance of the CommandData and vector of the path if any
#[tauri::command]
pub fn fetch_audio_files() -> Result<CommandData<Vec<PathBuf>>, CommandData<()>> {
    let audio_dir = dirs::audio_dir();

    // if there is an error getting the audio path, fire an error
    let Some(audio_dir) = audio_dir else{
        return Err(CommandData::new("error getting the audio dir", false, ()));
    };

    //
    let mut entries: Vec<PathBuf> = vec![];
    for entry in fs::read_dir(audio_dir).expect("error reading file") {
        let dir = entry.expect("could not read dir");
        entries.push(dir.path());
    }
    Ok(CommandData::new("retrieved all audio files", true, entries))
}

// get the video files
#[tauri::command]
pub fn fetch_video_files() -> Result<CommandData<Vec<PathBuf>>, CommandData<()>> {
    let video_dir = dirs::video_dir();

    // if there is an error getting the video path, fire an error
    let Some(video_dir) = video_dir else{
        return Err(CommandData::new("error reading the video dir", false, ()));
    };

    //
    let mut entries: Vec<PathBuf> = vec![];
    for entry in fs::read_dir(video_dir).expect("error reading file") {
        let dir = entry.expect("could not read dir");
        entries.push(dir.path());
    }
    Ok(CommandData::new("retrieved all audio files", true, entries))
}

// get

#[cfg(test)]
mod tests {
    use crate::commands;

    #[test]// see if there are files in the audio directory path
    fn _fetch_audio_files_() {
        let aud_files = commands::fetch_audio_files().ok();
        assert!(aud_files.is_some())
    }

    #[test]// see if there are files in the video directory path
    fn _fetch_video_files_() {
        let vid_files: Option<commands::CommandData<Vec<std::path::PathBuf>>> =
            commands::fetch_audio_files().ok();
        assert!(vid_files.is_some())
    }
}