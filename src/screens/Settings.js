import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  AsyncStorage,
} from "react-native";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false); // For notifications
  const [isDarkMode, setIsDarkMode] = useState(false); // For theme preference

  useEffect(() => {
    // Load the current settings from AsyncStorage
    const loadSettings = async () => {
      try {
        const notifications = await AsyncStorage.getItem(
          "notificationsEnabled"
        );
        const theme = await AsyncStorage.getItem("theme");

        if (notifications !== null) {
          setIsEnabled(JSON.parse(notifications));
        }
        if (theme !== null) {
          setIsDarkMode(theme === "dark");
        }
      } catch (error) {
        console.error("Error loading settings", error);
      }
    };

    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "notificationsEnabled",
        JSON.stringify(isEnabled)
      );
      await AsyncStorage.setItem("theme", isDarkMode ? "dark" : "light");
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Text
        style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}
      >
        Settings
      </Text>

      <View style={styles.option}>
        <Text
          style={[
            styles.optionText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          Enable Notifications
        </Text>
        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>

      <View style={styles.option}>
        <Text
          style={[
            styles.optionText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <Button title="Save Settings" onPress={handleSaveSettings} />
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
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
  darkBackground: {
    backgroundColor: "#333",
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
});

export default Settings;
