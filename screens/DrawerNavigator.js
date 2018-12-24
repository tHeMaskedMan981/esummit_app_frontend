import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import {StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Container, Content, Icon, Header, Body } from 'native-base'
import HomeScreen from './HomeScreen';
// import MyEventScreen from './MyEventScreen';
// import SpeakerSessions from './SpeakerSessions';
// import NetworkingEvents from './NetworkingEvents';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import HomeScreenTabNavigator from './HomeScreenTabNavigator'
import EventTabNavigator from './EventTabNavigator'
import SponsorNavigator from './SponsorNavigator'
import HelplineNavigator from './HelplineNavigator'
import DeveloperNavigator from './DeveloperNavigator'

const InnerStackNavigator = new createStackNavigator({
    TabNavigator: {
        screen: HomeScreenTabNavigator
    }
})

const EventStackNavigator = new createStackNavigator({
    EventTabNavigator: {
        screen: EventTabNavigator
    }
})

const SponsorStackNavigator = new createStackNavigator({
    SponsorNavigator: {
        screen: SponsorNavigator
    }
})

const HelplineStackNavigator = new createStackNavigator({
    HelplineNavigator: {
        screen: HelplineNavigator
    }
})

const DeveloperStackNavigator = new createStackNavigator({
    DeveloperNavigator: {
        screen: DeveloperNavigator
    }
})

const CustomDrawerContentComponent = (props) => (

    <Container>
      <Header style={styles.drawerHeader}>
        <Body style={styles.container}>
          <Image
            style={styles.drawerImage}
            source={require('../assets/images/robot-dev.png')} />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
  
    </Container>
  
  );
  
const AppDrawerNavigator = new createDrawerNavigator({
    HomeScreen: { screen: InnerStackNavigator },
    Schedule: { screen: EventStackNavigator },
    Sponsors: {screen : SponsorStackNavigator},
    Helpline: {screen : HelplineStackNavigator},
    Developer: {screen : DeveloperStackNavigator}

    },
    {
      initialRouteName: 'HomeScreen',
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle'
  }
)


export default AppDrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawerHeader: {
      height: 150,
      backgroundColor: 'white'
    },
    drawerImage: {
      height: 100,
      width: 100,
      borderRadius: 75
    }
  
});