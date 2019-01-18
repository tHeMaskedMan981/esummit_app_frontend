import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
    ToastAndroid
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Container, Content, Icon, Header, Body } from 'native-base'
// import HomeScreen from './HomeScreen';
import suit from '../assets/images/suit.jpg';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import HomeScreenTabNavigator from './HomeScreenTabNavigator'
import EventTabNavigator from './EventTabNavigator'
// import SponsorNavigator from './SponsorNavigator'
import HelplineNavigator from './HelplineNavigator'
import DeveloperNavigator from './DeveloperNavigator'
import SpeakerNavigator from './SpeakerNavigator'
// import ContactNavigator from './ContactNavigator'
import FeedbackNavigator from './FeedbackNavigator'
// import LogoutNavigator from './LogoutNavigator'

const InnerStackNavigator = new createStackNavigator({
    TabNavigator : {
        screen: HomeScreenTabNavigator
    }
})

const EventStackNavigator = new createStackNavigator({
    EventTabNavigator : {
        screen: EventTabNavigator
    }
})

// const SponsorStackNavigator = new createStackNavigator({
//     SponsorNavigator: {
//         screen: SponsorNavigator
//     }
// })

const SpeakerStackNavigator = new createStackNavigator({
    SpeakerNavigator : {
        screen: SpeakerNavigator
    }
})

const HelplineStackNavigator = new createStackNavigator({
    HelplineNavigator : {
        screen: HelplineNavigator
    }
})

const DeveloperStackNavigator = new createStackNavigator({
    DeveloperNavigator : {
        screen: DeveloperNavigator
    }
}) 

// const ContactStackNavigator = new createStackNavigator({
//     ContactNavigator: {
//         screen: ContactNavigator
//     }
// })
const FeedbackStackNavigator = new createStackNavigator({
    FeedbackNavigator : {
        screen: FeedbackNavigator
    }
})
// const LogoutStackNavigator = new createStackNavigator({
//     LogoutNavigator: {
//         screen: LogoutNavigator
//     }
// })

var user_name;
var user_id;

const CustomDrawerContentComponent = (props) => (

    <Container>
      <Header style={styles.drawerHeader}>
        <Body style={styles.container}>
          <Image
            style={styles.drawerImage}
            source={require('../assets/images/suit.jpg')} />
            <View style={styles.welcome}>
                <Text style={{color:'white', fontWeight: 'bold',width:'100%'}}>  E-Summit'19  </Text>
            </View>
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
  
    </Container>
  
  );
const AppDrawerNavigator = new createDrawerNavigator({

    Highlights : { screen: InnerStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-star" size={16} />
            )
        }
    },
    Schedule : { screen: EventStackNavigator, 
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-bookmark" size={16} />
            )
        }
    },
    // Sponsors: {screen : SponsorStackNavigator,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Ionicons name="md-home" size={16} />
    //         )
    //     }
    // },
    // Speakers: {screen: SpeakerStackNavigator,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Ionicons name="md-person" size={16} />
    //         )
    //     }
    // },
    Helpline : {screen : HelplineStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-medkit" size={16} />
            )
        }
    },
    Feedback : {screen : FeedbackStackNavigator,
        navigationOptions: {
            drawerIcon: () => (
                <Ionicons name="md-book" size={16} />
            )
        }
    },
    // Developer: {screen : DeveloperStackNavigator,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Ionicons name="md-code-working" size={16} />
    //         )
    //     }
    // },
    // Contacts: {screen : ContactStackNavigator,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Ionicons name="md-call" size={16} />
    //         )
    //     }
    // },
    

    // Developers: {screen: DeveloperStackNavigator,
    //     navigationOptions:{
    //         drawerIcon:()=>(
    //             <Ionicons name="md-home" size={16}/>
    //         )
    //     }
    // }
    // Logout: {screen : LogoutStackNavigator,
    //     navigationOptions: {
    //         drawerIcon: () => (
    //             <Ionicons name="md-home" size={16} />
    //         )
    //     }
    // },
    },
    {
      initialRouteName: 'Highlights',
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      backgroundColor: 'steelblue',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: 'steelblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
      drawerIcon: ({tintColor}) => (
        <Image 
            source={suit}
            style={{height:24, width:24, tintColor: tintColor}}
        />
      )
  }
)

var checkDict = {};
var allEvents = {};
var myEvents = {};

export default class AppTabNavigator extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          email: '',
          esummit_id: '',
          user_name:'',
          user_id:'',
          count:0,
          myEventsSource:[],
          Dict:{},
        };
      }

      _storeData = async (key, value) => {

        try {
          await AsyncStorage.setItem(key,JSON.stringify(value));
        //   console.log("the stored value is : " + JSON.stringify(value));
    
        } catch (error) {
            this.setState({email_err:"problem with storage"});
        }
      }
    _retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
        //   console.log("the retrieved data is : "+ (value));
    
          if (!(value == null)) {
            this.setState({key:value});
            console.log("the retrieved data is : "+ key);
          }
         } catch (error) {
           // Error retrieving data
           console.log(error);
           return "cant retrieve data";
         }
      }

      async componentDidMount(){
          
        // get the data from the phone storage, use it to load the components, then download the data
        //  and update state and storage
        console.log("drawer navigator component did mount called" ); 

        this._retrieveData("myEventsSource");
        this._retrieveData("checkDict");
        this._retrieveData("allEvents");
        this._retrieveData("dataSource");
        // this._retrieveData("speakerSource");
        // this._retrieveData("competitionSource");
        // this._retrieveData("othersSource");
        // this._retrieveData("highlightSource");
       

        fetch('http://esummit.ecell.in/v1/api/events')
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.setState({
                    isLoading:false,
                    dataSource: responseJson,
                    refreshing: false,
                });
                // update phone storage dataSource
                this._storeData("dataSource", responseJson);
                // console.log("all events : " + JSON.stringify(responseJson));    
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

            // this.refresh_and_update();
    }

    refresh_and_update = ()=>{

        // console.log("refresh and update called");
        // fetch('http://esummit.ecell.in/v1/api/events/speaker/')
        //     .then((response)=>response.json())
        //     .then((responseJson)=>{
        //         this.setState({speakerSource: responseJson});
        //         this._storeData("speakerSource", responseJson);
        //     });
            fetch('http://esummit.ecell.in/v1/api/events')
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.setState({dataSource: responseJson});
                this._storeData("dataSource", responseJson);
                ToastAndroid.showWithGravityAndOffset(
                    'Updated',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    40,
                )
                console.log("refresh and update drawer called" ); 
            });
        //     fetch('http://esummit.ecell.in/v1/api/events/competition/')
        //     .then((response)=>response.json())
        //     .then((responseJson)=>{
        //         this.setState({competitionSource: responseJson});
        //         this._storeData("competitionSource", responseJson);
        //     });
        //     fetch('http://esummit.ecell.in/v1/api/events/others/')
        //     .then((response)=>response.json())
        //     .then((responseJson)=>{
        //         this.setState({othersSource: responseJson});
        //         this._storeData("othersSource", responseJson);
        //     });
        if (user_id==null)
        return;
        console.log("inside refresh and update");
            fetch('http://esummit.ecell.in/v1/api/events/myevents/'+user_id.toString())
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.setState({
                    myEventsSource: responseJson
                });
            
                 console.log("inside refresh and update response");
                 console.log("my events in response "+JSON.stringify(responseJson));
                 console.log("my events after updating "+JSON.stringify(this.state.myEventsSource));
            
                this._storeData("myEventsSource", responseJson);
                
            });
    }

    initializeCheckDict = () => {
        // get the myevents data, make a dictionary to facilitate the highlighting of Events, store in storage,
        // update the state 
        console.log("the url is : " + 'http://esummit.ecell.in/v1/api/events/myevents/'+user_id.toString());
        fetch('http://esummit.ecell.in/v1/api/events/myevents/'+user_id.toString()+'')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                myEventsSource: responseJson,
                trackMyEvents:true,
            });
            this._storeData("myEventsSource", responseJson);
            console.log('myevents checked the user defined events are' + JSON.stringify(this.state.myEventsSource));
        }).then(()=>{
            checkDict={};
            // settings all the events in my events as true
            for(let i=0;i<this.state.myEventsSource.length;++i){
                myEvents[String(this.state.myEventsSource[i].event_id)] =this.state.myEventsSource[i];
                checkDict[String(this.state.myEventsSource[i].event_id)] = true;
            }
            // settings all the events not in my events as false
            for(let i=0;i<this.state.dataSource.length;++i){
                allEvents[String(this.state.dataSource[i].event_id)] =this.state.dataSource[i];
                if(!(String(this.state.dataSource[i].event_id) in checkDict)){
                checkDict[String(this.state.dataSource[i].event_id)] = false;
                }
            }
            this.setState({
                Dict: checkDict,
                allEvents:allEvents,
                myEvents:myEvents,
            });
            this._storeData("myEvents", myEvents);
            this._storeData("allEvents", allEvents);
            this._storeData("checkDict", checkDict);

            console.log("this is inside drawer navigator"+JSON.stringify(this.state.Dict));
        }).catch((error)=>{
            console.log(error);
        })
    }

    handleClick = (event_id) => {
        // Update the checkDict, remove the event from myevents if already present, or add it from allEvents.
        // update the local storage, state and call the api 

        if (user_id==null)
        {
            ToastAndroid.showWithGravityAndOffset(
                'Not logged in. Login to access this feature',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40,
            );
            return;
        }
        

        var data = this.state.count;
        data = data+1;
        console.log("handle click called  : " + JSON.stringify(data));

        fetch('http://esummit.ecell.in/v1/api/events/myevent_add', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_id: event_id,
            user_id: user_id,
        }),
        })
        .then(()=>{
            console.log("event with event id "+event_id.toString()+" added to user 2 ");
            checkDict[String(event_id)] = !checkDict[String(event_id)];
            ToastAndroid.showWithGravityAndOffset(
                checkDict[String(event_id)]?'Added':'Removed',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40,
            );
            this.setState({
                Dict:checkDict,
                count:data,
            });
            this.refresh_and_update();
        })
        .catch(()=>{
            ToastAndroid.showWithGravityAndOffset(
                "Network error",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40);
        });
    }
    render() {
        const { navigation } = this.props;
        user_id = navigation.getParam('user_id', 'NO-ID');
        user_name = navigation.getParam('user_name', 'Disruptor');
        const email = navigation.getParam('email', 'NO-ID');
        const esummit_id = navigation.getParam('esummit_id', 'NO-ID');
        
        return (
            <AppDrawerNavigator screenProps={{ navigation: this.props.navigation,
                                                user_id:user_id,
                                                user_name:user_name,
                                                count:this.state.count,
                                                handleClick:this.handleClick,
                                                checkDict:this.state.Dict,
                                                handleRefresh:this.refresh_and_update,
                                                myEventsSource:this.state.myEventsSource,
                                                dataSource:this.state.dataSource,
                                                
                                             }} />
        )
    }
}

// export default AppDrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin:25,
        padding:25,
    },
    drawerHeader: {
      height: 200,
      backgroundColor: '#221d3d'
    },
    drawerImage: {
      height: 100,
      width: 100,
      borderRadius: 75,
    },
    welcome: {
        flex:1,
        textAlign: 'left',
        fontWeight:'700',
        padding:5,
        margin:5
    }
  
});