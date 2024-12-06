import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Button } from "react-native";
import { getAudioNotes, deleteAudioNote } from "../utils/audioUtils"; // Utility functions for managing audio files
import { useNavigation } from "@react-navigation/native";

const AudioHome = () => {
  const [audioNotes, setAudioNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAudioNotes = async () => {
      const notes = await getAudioNotes();
      setAudioNotes(notes);
    };
    loadAudioNotes();
  }, []);

  return (
    <View>
      <Text>My Audio Notes</Text>
      <FlatList
        data={audioNotes}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button
              title="Play"
              onPress={() =>
                navigation.navigate("PlayAudio", { filePath: item.path })
              }
            />
            <Button title="Delete" onPress={() => deleteAudioNote(item.path)} />
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
      <Button
        title="Start New Recording"
        onPress={() => navigation.navigate("RecordAudio")}
      />
    </View>
  );
};

export default AudioHome;
