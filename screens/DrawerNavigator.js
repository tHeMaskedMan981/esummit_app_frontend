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
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreenTabNavigator from './HomeScreenTabNavigator'
import EventTabNavigator from './EventTabNavigator'
import SponsorNavigator from './SponsorNavigator'
import HelplineNavigator from './HelplineNavigator'
import DeveloperNavigator from './DeveloperNavigator'
import MapNavigator from './MapNavigator'
import SpeakerNavigator from './SpeakerNavigator'

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

const SpeakerStackNavigator = new createStackNavigator({
    SpeakerNavigator: {
        screen: SpeakerNavigator
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

const MapStackNavigator = new createStackNavigator({
    MapNavigator: {
        screen: MapNavigator,
        navigationOptions: {
          header: null
        }
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
      <Content style={styles.screenContainer}>
        <DrawerItems {...props} />
      </Content>
  
    </Container>
  
  );
  
const AppDrawerNavigator = new createDrawerNavigator({
    HomeScreen: { 
        screen: InnerStackNavigator, 
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-home" size={16} />
            )
        }
    },
    Schedule: { 
        screen: EventStackNavigator, 
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }
    },
    Sponsors: {
        screen : SponsorStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }
    },
    Helpline: {
        screen : HelplineStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }
    },
    Developer: {
        screen : DeveloperStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }    
    },
    Map: {
        screen : MapStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-compass" size={16} />
            )
        }
    }

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

export default class AppTabNavigator extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          email: '',
          esummit_id: '',
          user_name:'',
          user_id:'',
    
        };
      }

    render() {
        const { navigation } = this.props;
        const user_id = navigation.getParam('user_id', 'NO-ID');
        const user_name = navigation.getParam('user_name', 'some default name');
        const email = navigation.getParam('email', 'NO-ID');
        const esummit_id = navigation.getParam('esummit_id', 'NO-ID');

        // this.setState({
        //     user_name:user_name,
        //     user_id: user_id,
        //     email:email,
        //     esummit_id:esummit_id,
        // });
        
        return (
            <AppDrawerNavigator screenProps={{ navigation: this.props.navigation,
                                                user_id:user_id,
                                                user_name:user_name
                                             }} />
        )
    }
}

// export default AppDrawerNavigator;

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
    },
    screenContainer: {
        paddingTop: 20
    }
});
