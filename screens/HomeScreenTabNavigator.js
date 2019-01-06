import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ScreenOne from './TabNavigator/ScreenOne'
import ScreenTwo from './TabNavigator/ScreenTwo'
import ScreenThree from './TabNavigator/ScreenThree'
//import HomeScreen from './HomeScreen' 
var globalCheckBoxDict = {};

export default class AppTabNavigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            parentCheckBoxDict:globalCheckBoxDict,
            initializeCheckDict: this.initializeCheckDict.bind(this),
            componentDidMount: this.componentDidMount.bind(this),
        }
    }
    componentDidMount(){
        fetch('http://esummit.ecell.in/v1/api/events')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                dataSource: responseJson,
            });
        })
        .then(()=>{
            this.state.initializeCheckDict();
        })
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} onPress={() => navigation.openDrawer()} />
                </View>
            )
        }
    }
    initializeCheckDict(){
        fetch('http://esummit.ecell.in/v1/api/events/myevents/2')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                myEventsSource: responseJson,
            });
            console.log('myevents checked');
        }).then(()=>{
            // console.log(JSON.stringify(this.state.myEventsSource));
            // console.log(JSON.stringify(this.state.dataSource));
            console.log(JSON.stringify(this.state.myEventsSource[0]));
            for(let i=0;i<this.state.myEventsSource.length;++i){
                globalCheckBoxDict[String(this.state.myEventsSource[i].event_id)] = true;
            }
            for(let i=0;i<this.state.dataSource.length;++i){
                if(!(String(this.state.dataSource[i].event_id) in checkDict)){
                globalCheckBoxDict[String(this.state.dataSource[i].event_id)] = false;
                }
            }
            // for(let obj in this.state.dataSource){
            //     if(!(String(obj.event_id) in checkDict)){
            //         checkDict[String(obj.event_id)] = false;
            //         console.log(obj.event_id);
            //     }
            // }
            this.setState({
                parentCheckBoxDict: globalCheckBoxDict,
            })
        })
    }
    render() {
        return (
            <HomeScreenTabNavigator screenProps={{  navigation: this.props.navigation,
                                                    user_name:this.props.screenProps.user_name,
                                                    user_id:this.props.screenProps.user_id,
                                                    properties:this.state}} />
        )
    }
}


const HomeScreenTabNavigator = new createBottomTabNavigator({
    ScreenOne: {
        screen: ScreenOne,
        navigationOptions: {
            tabBarLabel: 'Highlight Events',
            tabBarIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }
    },
    ScreenTwo: {
        screen: ScreenTwo,
        navigationOptions: {
            tabBarLabel: 'My Events',
            tabBarIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }
    },
    ScreenThree:{
        screen: ScreenThree,
        navigationOptions:{
            tabBarLabel:'Updated Events',
            tabBarIcon:()=>(
                <Ionicons name='md-compass' size={16}/>
            )
        }
    }
})
// const HomeScreen = new createStackNavigator({
//     HomeScreen:{
//         screen:HomeScreen
//     },
// })
// export class StackNavigator extends Component{
//     render(){
//         return(
//             <HomeScreen></HomeScreen>
//         )
//     }
// }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});