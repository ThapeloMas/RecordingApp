// app.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import Settings from "./src/screens/Settings";
import Feedback from "./src/screens/Feedback";
import AudioHome from "./src/screens/AudioHome";

import { getData } from "./src/utils/storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth stack for login and registration
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="home" component={AppTabs} />
  </Stack.Navigator>
);

// App tabs for authenticated users
const AppTabs = ({ isDarkMode }) => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: isDarkMode ? "black" : "white" },
      tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Settings" component={Settings} />
    <Tab.Screen name="Feedback" component={Feedback} />
    <Tab.Screen name="AudioHome" component={AudioHome} />
  </Tab.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await getData("isLoggedIn");
      setIsAuthenticated(!!isLoggedIn);
    };

    const loadTheme = async () => {
      const theme = await getData("theme");
      setIsDarkMode(theme === "dark");
    };

    checkAuth();
    loadTheme();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs isDarkMode={isDarkMode} /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
