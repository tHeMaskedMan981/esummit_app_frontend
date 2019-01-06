import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ScreenOne from './TabNavigator/ScreenOne'
import ScreenTwo from './TabNavigator/ScreenTwo'
import ScreenThree from './TabNavigator/ScreenThree'



export default class AppTabNavigator extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} onPress={() => navigation.openDrawer()} />
                </View>
            )
        }
    }
    render() {
        return (
            <HomeScreenTabNavigator screenProps={{  navigation: this.props.navigation,
                                                    user_name:this.props.screenProps.user_name,
                                                    user_id:this.props.screenProps.user_id }} />
        )
    }
}

const HomeScreenTabNavigator = new createBottomTabNavigator({
    ScreenOne: {
        screen: ScreenOne,
        navigationOptions: {
            tabBarLabel: 'Highlight Events',
            tabBarIcon: () => (
                <Ionicons name="ios-star" size={16} />
            )
        }
    },
    ScreenTwo: {
        screen: ScreenTwo,
        navigationOptions: {
            tabBarLabel: 'My Events',
            tabBarIcon: () => (
                <Ionicons name="md-person" size={16} />
            )
        }
    },
    ScreenThree:{
        screen: ScreenThree,
        navigationOptions:{
            tabBarLabel:'Updated Events',
            tabBarIcon:()=>(
                <Ionicons name='md-notifications' size={16}/>
            )
        }
    }
})
// const HomeScreen = new createStackNavigator({
//     HomeScreen: { screen: HomeScreen },
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});