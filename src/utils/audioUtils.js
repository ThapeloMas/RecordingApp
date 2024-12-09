import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

// Initialize the audio recorder player instance
const audioRecorderPlayer = new AudioRecorderPlayer();

const STORAGE_KEY = "@audio_notes"; // Key for storing audio metadata

// Helper function to get audio notes from AsyncStorage
const getStoredAudioNotes = async () => {
  const storedData = await AsyncStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

// Helper function to save audio notes to AsyncStorage
const saveAudioNoteToStorage = async (filePath) => {
  const audioNotes = await getStoredAudioNotes();
  audioNotes.push({ name: filePath.split("/").pop(), path: filePath });
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(audioNotes));
};

// Start recording audio
export const startRecording = async () => {
  const path = `${
    FileSystem.documentDirectory
  }audio_note_${new Date().toISOString()}.mp3`; // Path to save the audio file
  await audioRecorderPlayer.startRecording(path.replace("file://", "")); // Start recording the audio
  return path; // Return the file path for later use
};

// Stop recording and save audio metadata
export const stopRecording = async () => {
  const result = await audioRecorderPlayer.stopRecording(); // Stop recording
  await saveAudioNoteToStorage(result.path); // Save audio note to AsyncStorage
  return { path: result.path }; // Return the file path of the recorded audio
};

// Save audio (this could be used for extra functionality if needed)
export const saveAudio = async (filePath) => {
  console.log("Audio saved at:", filePath);
  // You can add custom logic for saving audio to a server or processing it here
};

// Start playing audio from a given file path
export const startPlaying = async (path) => {
  await audioRecorderPlayer.startPlayer(path.replace("file://", "")); // Start playing the audio
};

// Stop the currently playing audio
export const stopPlaying = async () => {
  await audioRecorderPlayer.stopPlayer(); // Stop audio playback
};

// Get all saved audio notes from AsyncStorage
export const getAudioNotes = async () => {
  return await getStoredAudioNotes(); // Return audio notes stored in AsyncStorage
};

// Delete an audio note from file system and AsyncStorage
export const deleteAudioNote = async (filePath) => {
  // Delete the audio file from the file system
  await FileSystem.deleteAsync(filePath);

  // Retrieve current audio notes from AsyncStorage
  const audioNotes = await getStoredAudioNotes();

  // Filter out the deleted note
  const updatedNotes = audioNotes.filter((note) => note.path !== filePath);

  // Save the updated audio notes list back to AsyncStorage
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
};
