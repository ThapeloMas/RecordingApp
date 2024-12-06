import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { startRecording, stopRecording, saveAudio } from "../utils/audioUtils"; // Audio utilities
import { useNavigation } from "@react-navigation/native";

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState("");
  const navigation = useNavigation();

  const handleStartStopRecording = async () => {
    if (isRecording) {
      const path = await stopRecording();
      setAudioPath(path);
      saveAudio(path); // Optionally save the recording
      setIsRecording(false);
    } else {
      const path = await startRecording();
      setAudioPath(path);
      setIsRecording(true);
    }
  };

  return (
    <View>
      <Text>{isRecording ? "Recording..." : "Not Recording"}</Text>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={handleStartStopRecording}
      />
      {audioPath && (
        <Button
          title="Save Recording"
          onPress={() => {
            // Save recording and navigate back
            saveAudio(audioPath);
            navigation.navigate("AudioHome");
          }}
        />
      )}
    </View>
  );
};

export default RecordAudio;
