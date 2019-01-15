import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Container, Content, Icon, Header, Body } from 'native-base'
// import { createStackNavigator } from 'react-navigation'
import DrawerNavigator from './screens/DrawerNavigator'
import {StackNavigator,createStackNavigator, DrawerItems} from 'react-navigation'
import WelcomeScreen from './screens/login/WelcomeScreen'
import LoginScreen from './screens/login/LoginScreen'
import SignUpScreen from './screens/login/SignUpScreen'
import HomeScreen from './screens/HomeScreen'


export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = new createStackNavigator({
  WelcomeScreen: { 
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }},
  LoginScreen: { screen: LoginScreen },
  SignUpScreen: { screen: SignUpScreen },
  HomeScreen: { screen: HomeScreen },
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null
    }
  }
}, {
    navigationOptions: {
      gesturesEnabled: false
    }
  })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
