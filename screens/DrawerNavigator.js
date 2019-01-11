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

// const { navigation } = this.props;
// const user_name = navigation.getParam('user_name', 'some default name');

const CustomDrawerContentComponent = (props) => (

    <Container>
      <Header style={styles.drawerHeader}>
        <Body style={styles.container}>
          <Image
            style={styles.drawerImage}
            source={require('../assets/images/robot-dev.png')} />
            <View style={styles.welcome}>
                <Text>Hi User</Text>
            </View>
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
    Speakers: {screen: SpeakerStackNavigator},
    Helpline: {screen : HelplineStackNavigator},
    Developer: {screen : DeveloperStackNavigator},
    Map: {screen : MapStackNavigator}

    },
    {
      initialRouteName: 'HomeScreen',
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      drawerIcon: ({tintColor}) => (
        <Image 
            source={require('../assets/images/robot-prod.png')}
            style={{height:24, width:24, tintColor: tintColor}}
        />
      )
  }
)

var checkDict = {};

export default class AppTabNavigator extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          email: '',
          esummit_id: '',
          user_name:'',
          user_id:'',
          count:0,
          isLoading:true,
          modalVisible:false,
          refreshing:false,
          seed:1,
          trackHighlightEvents:false,
          trackMyEvents:false,
          Dict:{},

          screen:0,
          event_name:'',
          event_desc:'',
          event_photo_url:'',
          event_web:'',
          event_type:'',
          event_id:'',
          likes:'',

          CheckBoxStyle:{},
          fontLoading:true,

    
        };
      }
      async componentDidMount(){
        
        fetch('http://esummit.ecell.in/v1/api/events')
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.setState({
                    isLoading:false,
                    dataSource: responseJson,
                    refreshing: false,
                })
            })
            .catch(()=>{
                ToastAndroid.showWithGravityAndOffset(
                    "Unable to connect to internet",
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    40);
            })
            .then(()=>{
                this.initializeCheckDict();
            });
    }

    initializeCheckDict(){
        fetch('http://esummit.ecell.in/v1/api/events/myevents/2')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                myEventsSource: responseJson,
                trackMyEvents:true,
            });
            console.log('myevents checked from drawer navigator');
        }).then(()=>{
            // console.log(JSON.stringify(this.state.myEventsSource));
            // console.log(JSON.stringify(this.state.dataSource));
            console.log(JSON.stringify(this.state.myEventsSource[0]));
            for(let i=0;i<this.state.myEventsSource.length;++i){
                checkDict[String(this.state.myEventsSource[i].event_id)] = true;
            }
            for(let i=0;i<this.state.dataSource.length;++i){
                if(!(String(this.state.dataSource[i].event_id) in checkDict)){
                checkDict[String(this.state.dataSource[i].event_id)] = false;
                }
            }
            // for(let obj in this.state.dataSource){
            //     if(!(String(obj.event_id) in checkDict)){
            //         checkDict[String(obj.event_id)] = false;
            //         console.log(obj.event_id);
            //     }
            // }
            this.setState({
                Dict: checkDict,
            });
            console.log("this is inside drawer navigator"+JSON.stringify(this.state.Dict));
        }).catch((error)=>{
            console.log(error);
        })
    }

        handleClick = (event_id) => {
            // console.log("handle click reached");
            data = this.state.count;
            data = data+1;
            this.setState({count:data});
            // console.log("updated count: " + this.state.count.toString());
            checkDict[String(event_id)] = !checkDict[String(event_id)];
            this.setState({
                Dict:checkDict,
            });
        }

        CallMyEventsApi(evt_id){
            fetch('http://esummit.ecell.in/v1/api/events/myevent_add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: evt_id,
                user_id: 2,
            }),
            }).then()
        .catch((error) => {
           // ToastAndriod.show(error,ToastAndriod.SHORT);
            ToastAndroid.showWithGravityAndOffset(
                String(error),
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40);
        }).then(()=>{
            // this.ref.toast.show('hello world');
        });
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
                                                user_name:user_name,
                                                count:this.state.count,
                                                handleClick:this.handleClick,
                                                checkDict:this.state.Dict,
                                             }} />
        )
    }
}

// export default AppDrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    drawerHeader: {
      height: 150,
      backgroundColor: 'white'
    },
    drawerImage: {
      height: 100,
      width: 100,
      borderRadius: 75,
      marginBottom:15,
    },
    welcome: {
        flex:1,
        textAlign: 'left',
        padding: 10,
        marginBottom:15,
    }
  
});