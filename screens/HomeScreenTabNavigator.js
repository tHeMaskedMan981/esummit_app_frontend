import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { createBottomTabNavigator,createTabNavigator,createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ScreenOne from './TabNavigator/ScreenOne'
import ScreenTwo from './TabNavigator/ScreenTwo'
// import ScreenThree from './TabNavigator/ScreenThree'
import ScreenOne2 from './TabNavigator/ScreenOne2'
import ScreenTwo2 from './TabNavigator/ScreenTwo2'
// import ScreenThree2 from './TabNavigator/ScreenThree2'
//import HomeScreen from './HomeScreen' 
//var globalCheckBoxDict = {};


class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../assets/images/robot-dev.png')}
          style={{ width: 30, height: 30 }}
        />
      );
    }
  }

export default class AppTabNavigator extends Component {

    static navigationOptions = ({ navigation }) => {

        
        return {
            // headerTitle: <LogoTitle />,
            title:'Highlights',
            headerTintColor: '#fff',
            headerLeft: (
                <View style={{ padding: 10,flexDirection:'row' }}>
                    <Ionicons name="md-menu" size={44} color='white' onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerStyle: {
                backgroundColor: '#221d3d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
          
        }
    }
    render() {
        return (
            <HomeScreenTabNavigator screenProps={{  navigation: this.props.navigation,
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

const ScreenOneTabNavigator = new createMaterialTopTabNavigator({
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
},
{
        tabBarOptions: {
            activeTintColor: 'white',
            activeBackgroundColor:'#D3D3D3',
            labelStyle: {
              fontSize: 14,
            //   color:'red',
            },
            style: {
            //   backgroundColor: '#6673a4',
            },
          }
    });

//     constScreenOneDay1Stack = new createStackNavigator({
//         screenOne: {
//             screen: ScreenOne
//         },
//         details: {
//             screen: details
//         }
//     })
// const ScreenTwoTabNavigator = new createMaterialTopTabNavigator({
//     screenTwoDay1: {
//         screen: ScreenTwo,
//         navigationOptions: {
//             tabBarLabel: 'Day 1'}
//     },
//     screenTwoDay2: {
//         screen: ScreenTwo2,
//         navigationOptions: {
//             tabBarLabel: 'Day 2'}
//     }    
// })
// const ScreenThreeTabNavigator = new createMaterialTopTabNavigator({
//     screenThreeDay1: {
//         screen: ScreenThree,
//         navigationOptions: {
//             tabBarLabel: 'Day 1'}
//     },
//     screenThreeDay2: {
//         screen: ScreenThree2,
//         navigationOptions: {
//             tabBarLabel: 'Day 2'}
//     }    
// })

// const HomeScreenTabNavigator = new createBottomTabNavigator({
//     ScreenOne: {
//         screen: ScreenOneTabNavigator,
//         navigationOptions: {
//             tabBarLabel: 'Highlight Events',
//             activeBackgroundColor:'#D3D3D3',
//             activeTintColor:'#D3D3D3',
//             tabBarIcon: () => (
//                 <Ionicons name="ios-star"  size={16} />
//             )
//         }
//     },
//     // ScreenTwo: {
//     //     screen: ScreenTwoTabNavigator,
//     //     navigationOptions: {
//     //         tabBarLabel: 'My Events',
//     //         tabBarIcon: () => (
//     //             <Ionicons name="md-person"  size={16} />
//     //         )
//     //     }
//     // },
//     // ScreenThree:{
//     //     screen: ScreenThreeTabNavigator,
//     //     navigationOptions:{
//     //         tabBarLabel:'Updated Events',
//     //         tabBarIcon:()=>(
//     //             <Ionicons name='md-notifications' size={16}/>
//     //         )
//     //     }
//     // }
// },
// {
//     tabBarOptions: {
//         activeTintColor: '#6673a4',
//         activeBackgroundColor:'#D3D3D3',
//         labelStyle: {
//           fontSize: 14,
//         },
//         style: {
//           backgroundColor: 'white',
//         },
//       }
// }

// )

const HomeScreenTabNavigator = new createStackNavigator({
    ScreenOne: {
        screen: ScreenOneTabNavigator,
        navigationOptions: {
          header: null
        }},
    }
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});