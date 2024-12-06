import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { saveFeedback } from "../utils/storage"; // Utility function to save feedback

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = async () => {
    if (feedback.trim()) {
      try {
        // Save feedback to AsyncStorage (or send to backend)
        await saveFeedback(feedback);
        setFeedback("");
        Alert.alert("Success", "Thank you for your feedback!");
      } catch (error) {
        Alert.alert("Error", "There was an issue submitting your feedback.");
        console.error(error);
      }
    } else {
      Alert.alert("Error", "Please enter some feedback.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>We Value Your Feedback</Text>
      <Text style={styles.subHeader}>
        Let us know your thoughts or report an issue.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Type your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />

      <Button title="Submit Feedback" onPress={handleFeedbackSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#777",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
  },
});

export default Feedback;
