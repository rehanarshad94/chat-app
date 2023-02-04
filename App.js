import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

// import react gesture handler
import 'react-native-gesture-handler';

// import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import screen files
import Start from './components/Start';
import Chat from './components/Chat';

// Native Navigator
const Stack = createStackNavigator();

export default class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen name='Start' component={Start}></Stack.Screen>
          <Stack.Screen name='Chat' component={Chat}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}