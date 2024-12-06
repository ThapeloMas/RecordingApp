import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Feedback from "../screens/Feedback";

const Tab = createBottomTabNavigator();

const AppTabs = ({ isDarkMode }) => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: isDarkMode ? "#333" : "#fff",
      },
      tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
    }}
  >
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Settings" component={Settings} />
    <Tab.Screen name="Feedback" component={Feedback} />
  </Tab.Navigator>
);

export default AppTabs;
