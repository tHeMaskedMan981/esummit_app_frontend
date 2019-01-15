import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { createBottomTabNavigator,createTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ScreenOne from './TabNavigator/ScreenOne'
import ScreenTwo from './TabNavigator/ScreenTwo'
import ScreenThree from './TabNavigator/ScreenThree'
import ScreenOne2 from './TabNavigator/ScreenOne2'
import ScreenTwo2 from './TabNavigator/ScreenTwo2'
import ScreenThree2 from './TabNavigator/ScreenThree2'
//import HomeScreen from './HomeScreen' 
//var globalCheckBoxDict = {};


export default class AppTabNavigator extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         parentCheckBoxDict:globalCheckBoxDict,
    //         initializeCheckDict: this.initializeCheckDict.bind(this),
    //         componentDidMount: this.componentDidMount.bind(this),
    //     }
    // }
    // componentDidMount(){
    //     fetch('http://esummit.ecell.in/v1/api/events')
    //     .then((response) => response.json())
    //     .then((responseJson)=>{
    //         this.setState({
    //             dataSource: responseJson,
    //         });
    //     })
    //     .then(()=>{
    //         this.state.initializeCheckDict();
    //     })
    // }
    
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
                                                    user_id:this.props.screenProps.user_id,
                                                    checkDict:this.props.screenProps.checkDict,
                                                    handleClick:this.props.screenProps.handleClick,
                                                    myEventsSource:this.props.screenProps.myEventsSource}} />
        )
    }
}

const ScreenOneTabNavigator = new createTabNavigator({
    screenOneDay1: {
        screen: ScreenOne,
        navigationOptions: {
            tabBarLabel: 'Day 1'}
    },
    screenOneDay2: {
        screen: ScreenOne2,
        navigationOptions: {
            tabBarLabel: 'Day 2'}
    }    
})
const ScreenTwoTabNavigator = new createTabNavigator({
    screenTwoDay1: {
        screen: ScreenTwo,
        navigationOptions: {
            tabBarLabel: 'Day 1'}
    },
    screenTwoDay2: {
        screen: ScreenTwo2,
        navigationOptions: {
            tabBarLabel: 'Day 2'}
    }    
})
const ScreenThreeTabNavigator = new createTabNavigator({
    screenThreeDay1: {
        screen: ScreenThree,
        navigationOptions: {
            tabBarLabel: 'Day 1'}
    },
    screenThreeDay2: {
        screen: ScreenThree2,
        navigationOptions: {
            tabBarLabel: 'Day 2'}
    }    
})

const HomeScreenTabNavigator = new createBottomTabNavigator({
    ScreenOne: {
        screen: ScreenOneTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Highlight Events',
            tabBarIcon: () => (
                <Ionicons name="ios-star" size={16} />
            )
        }
    },
    ScreenTwo: {
        screen: ScreenTwoTabNavigator,
        navigationOptions: {
            tabBarLabel: 'My Events',
            tabBarIcon: () => (
                <Ionicons name="md-person" size={16} />
            )
        }
    },
    ScreenThree:{
        screen: ScreenThreeTabNavigator,
        navigationOptions:{
            tabBarLabel:'Updated Events',
            tabBarIcon:()=>(
                <Ionicons name='md-notifications' size={16}/>
            )
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