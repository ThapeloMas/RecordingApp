import AsyncStorage from "@react-native-async-storage/async-storage";

// Generic functions for managing key-value pairs in AsyncStorage

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data", error);
  }
};

// Function to save feedback, adding it to an existing list of feedbacks

export const saveFeedback = async (feedback) => {
  try {
    let feedbackList = await getData("feedbacks"); // Use getData to retrieve current feedbacks
    feedbackList = feedbackList ? feedbackList : []; // If no feedback list exists, initialize it

    feedbackList.push({ id: new Date().toISOString(), feedback }); // Add the new feedback

    // Save the updated feedback list back to AsyncStorage
    await saveData("feedbacks", feedbackList); // Use saveData to save it
  } catch (error) {
    console.error("Error saving feedback:", error);
    throw error; // Rethrow error to be handled in the component
  }
};
