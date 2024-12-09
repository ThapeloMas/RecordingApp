// Login.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { getData, saveData } from "../utils/storage"; // Assuming these methods are for AsyncStorage

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check if email and password are provided
    if (!email || !password) {
      Alert.alert("Error", "Email and Password are required!");
      return;
    }

    try {
      // Get user data from AsyncStorage
      const user = await getData(email);

      // Check if the user exists and password matches
      if (!user || user.password !== password) {
        Alert.alert("Error", "Invalid email or password!");
        return;
      }

      // Simulate login success and save session info
      await saveData("isLoggedIn", true);
      await saveData("currentUser", user);

      // Navigate to the AudioHome screen
      navigation.navigate("home"); // Use "AudioHome" instead of "Audio"
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5 },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});

export default Login;
