// Profile.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { saveData, getData, removeData } from "../utils/storage"; // Assuming these are AsyncStorage utility functions

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const savedName = await getData("name");
      const savedPicture = await getData("profilePicture");
      setName(savedName || "");
      setProfilePicture(savedPicture || "");
    };
    loadProfile();
  }, []);

  const handleSave = () => {
    saveData("name", name);
    saveData("profilePicture", profilePicture);
    Alert.alert("Profile Saved!");
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && response.assets) {
        const base64 = response.assets[0].base64;
        setProfilePicture(base64);
      }
    });
  };

  const handleLogout = async () => {
    await removeData("isLoggedIn");
    await removeData("currentUser");

    navigation.navigate("Login"); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Pick Profile Picture" onPress={pickImage} />
      {profilePicture ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${profilePicture}` }}
          style={styles.image}
        />
      ) : null}
      <Button title="Save Profile" onPress={handleSave} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
  image: { width: 100, height: 100, marginVertical: 20 },
});

export default Profile;
