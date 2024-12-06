import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFS from "react-native-fs";

const audioRecorderPlayer = new AudioRecorderPlayer();

export const startRecording = async () => {
  const path = `${
    RNFS.DocumentDirectoryPath
  }/audio_note_${new Date().toISOString()}.mp3`;
  await audioRecorderPlayer.startRecording(path);
  return path;
};

export const stopRecording = async () => {
  const result = await audioRecorderPlayer.stopRecording();
  return result.path;
};

export const saveAudio = async (filePath) => {
  // Save audio file to your local storage if needed
  console.log("Audio saved at:", filePath);
  // Optionally, you could copy to another directory or perform backup actions here
};

export const startPlaying = async (path) => {
  await audioRecorderPlayer.startPlayer(path);
};

export const stopPlaying = async () => {
  await audioRecorderPlayer.stopPlayer();
};

export const getAudioNotes = async () => {
  const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
  return files.filter((file) => file.name.endsWith(".mp3"));
};

export const deleteAudioNote = async (filePath) => {
  await RNFS.unlink(filePath);
};
