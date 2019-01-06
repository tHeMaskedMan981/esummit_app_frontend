import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import SpeakerSessions from './EventNavigator/SpeakerSessions'
import NetworkingEvents from './EventNavigator/NetworkingEvents'
import MyEventScreen from './EventNavigator/MyEventScreen'


export default class AppTabNavigator extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Schedule",
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} onPress={() => navigation.openDrawer()} />
                </View>
            ),
            drawerLabel: 'Schedule',
            drawerIcon: ({ tintColor }) => (
              <Image
                source={require('../assets/images/robot-dev.png')}
                style={styles.icon}
              />
        ),
        }
    }
    render() {
        return (
            <EventTabNavigator screenProps={{ navigation: this.props.navigation }} />
        )
    }
}


const EventTabNavigator = new createBottomTabNavigator({
    SpeakerSessions: {
        screen: SpeakerSessions,
        navigationOptions: {
            tabBarLabel: 'Speakers',
            tabBarIcon: () => (
                <Ionicons name="md-compass" size={24} />
            )
        }
    },
    MyEventScreen: {
        screen: MyEventScreen,
        navigationOptions: {
            tabBarLabel: 'Competitions',
            tabBarIcon: () => (
                <Ionicons name="md-compass" size={24} />
            )
        }
    },
    NetworkingEvents: {
        screen: NetworkingEvents,
        navigationOptions: {
            tabBarLabel: 'Others',
            tabBarIcon: () => (
                <Ionicons name="md-compass" size={24} />
            )
        }
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
    },
});