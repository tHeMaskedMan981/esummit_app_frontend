import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import speakerSessions from './EventNavigator/speakerSessions'
import speakerSessions2 from './EventNavigator/speakerSessions2'
import competitions from './EventNavigator/competitions'
import competitions2 from './EventNavigator/competitions2'
import others from './EventNavigator/others'
import others2 from './EventNavigator/others2'


export default class AppTabNavigator extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Schedule",
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: 'steelblue',
              },
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} color='white' onPress={() => navigation.openDrawer()} />
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
            <EventTabNavigator screenProps={{  navigation: this.props.navigation,
                user_name:this.props.screenProps.user_name,
                user_id:this.props.screenProps.user_id,
                checkDict:this.props.screenProps.checkDict,
                count:this.props.screenProps.count,
                handleClick:this.props.screenProps.handleClick,
                handleRefresh:this.props.screenProps.handleRefresh,
                myEventsSource:this.props.screenProps.myEventsSource,
                dataSource:this.props.screenProps.dataSource}} />
        )
    }
}

const SpeakerTabNavigator = new createMaterialTopTabNavigator({
    speakerDay1: {
        screen: speakerSessions,
        navigationOptions: {
            tabBarLabel: 'Day 1'}
    },
    speakerDay2: {
        screen: speakerSessions2,
        navigationOptions: {
            tabBarLabel: 'Day 2'}
    }    
})
const CompetitionsTabNavigator = new createMaterialTopTabNavigator({
    competitionsDay1: {
        screen: competitions,
        navigationOptions: {
            tabBarLabel: 'Day 1'}
    },
    competitionsDay2: {
        screen: competitions2,
        navigationOptions: {
            tabBarLabel: 'Day 2'}
    }    
})
const OthersTabNavigator = new createMaterialTopTabNavigator({
    othersDay1: {
        screen: others,
        navigationOptions: {
            tabBarLabel: 'Day 1'}
    },
    othersDay2: {
        screen: others2,
        navigationOptions: {
            tabBarLabel: 'Day 2'}
    }    
})
const EventTabNavigator = new createBottomTabNavigator({
    SpeakerSessions: {
        screen: SpeakerTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Speakers',
            tabBarIcon: () => (
                <Ionicons name="md-person" color='white' size={20} />
            )
        }
    },
    competitions: {
        screen: CompetitionsTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Competitions',
            tabBarIcon: () => (
                <Ionicons name="md-trophy" color='white' size={20} />
            )
        }
    },
    others: {
        screen: OthersTabNavigator,
        navigationOptions: {
            tabBarLabel: 'Others',
            tabBarIcon: () => (
                <Ionicons name="ios-people" color='white' size={20} />
            )
        }
    },
},
{
    tabBarOptions: {
        activeTintColor: 'black',
        activeBackgroundColor:'#6674a3',
        labelStyle: {
          fontSize: 12,
          color:'white'
        },
        style: {
          backgroundColor: '#221d3d',
        },
      }
});

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