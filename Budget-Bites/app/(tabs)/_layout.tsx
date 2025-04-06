import { Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import React from 'react';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
          height: 68,
          marginHorizontal: 60,
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingTop: 15,
          borderRadius: 40,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: '#333',
          backgroundColor: Colors.grey, // Add explicit background color
          elevation: 10, // Add elevation for Android shadow
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: '#999',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: focused ? Colors.tintColor : Colors.grey,
              }}>
              <FontAwesome size={28} name="pie-chart" color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: focused ? Colors.tintColor : Colors.grey,
              }}>
              <FontAwesome size={28} name="exchange" color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: focused ? Colors.tintColor : Colors.grey,
              }}>
              <FontAwesome size={28} name="cutlery" color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: focused ? Colors.tintColor : Colors.grey,
              }}>
              <FontAwesome size={28} name="user" color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
