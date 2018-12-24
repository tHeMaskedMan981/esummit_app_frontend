import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DeveloperScreen from './DeveloperScreen'

export default class AppTabNavigator extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            drawerIcon:({tintColor}) => (
                <Icon name="home" style={{fontSize:24}} />
            ),
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} onPress={() => navigation.openDrawer()} />
                </View>
            )
        }
    }
    render() {
        return (
            <DeveloperNavigator screenProps={{ navigation: this.props.navigation }} />
        )
    }
}


const DeveloperNavigator = new createStackNavigator({
    DeveloperScreen: {
        screen: DeveloperScreen,
        navigationOptions:{
            header:null
        }
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});