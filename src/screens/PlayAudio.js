import React from "react";
import { Button, View } from "react-native";
import { startPlaying, stopPlaying } from "../utils/audioUtils"; // Playback utilities

const PlayAudio = ({ route }) => {
  const { filePath } = route.params;

  return (
    <View>
      <Button title="Play" onPress={() => startPlaying(filePath)} />
      <Button title="Stop" onPress={stopPlaying} />
    </View>
  );
};

export default PlayAudio;
