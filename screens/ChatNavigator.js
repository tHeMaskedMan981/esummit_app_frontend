import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableNativeFeedback,
    AsyncStorage,
    BackHandler,
    ToastAndroid
} from "react-native";

import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
var name='';
var bigchat=[];
export default class ChatNavigator extends Component{

    constructor(props){
        super(props);
        this.state = {
            chats:[]
        }
        this._retrievedata=this._retrievedata.bind(this);
        this._storedata=this._storedata.bind(this);
    }
 
    static navigationOptions = ({ navigation }) => {
        // const { navigation } = this.props;
        name = navigation.getParam('from_name', 'Disruptor');
        return {
            title: name ,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: 'steelblue',
              },
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} color='white' onPress={() => navigation.openDrawer()} />
                </View>
            ),
        //     drawerLabel: 'Schedule',
        //     drawerIcon: ({ tintColor }) => (
        //       <Image
        //         source={require('../assets/images/robot-dev.png')}
        //         style={styles.icon}
        //       />
        // ),
        }
    }

    
    _storedata(){
        let vari=[];
        vari = this.state.chats;
        AsyncStorage.setItem("chats",vari);
        this.setState({
            chats : vari
        });
        ToastAndroid.showWithGravityAndOffset(
            "stored",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40);
    }
    checking(){

    }
    _retrievedata(){
        // console.log(this.props.from_name)
        AsyncStorage.getItem("chats").then((vari)=>{
            this.setState({
                chats:vari
            });
            console.log("retrieved")
            ToastAndroid.showWithGravityAndOffset(
                        "retrieved",
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        0,
                        40);
        }).then(()=>{
            console.log("fetching start")
            ToastAndroid.showWithGravityAndOffset(
                "fetching start",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40);
            
            fetch('http://esummit.ecell.in/v1/chats/conversation',{
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from_name:name
            }),
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                chats:responseJson,
            });
            console.log("fetched")
            ToastAndroid.showWithGravityAndOffset(
                "fetching",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40);
            
        }).then(()=>{
            console.log("storing start")
            this._storedata();
        })
        })
    //     fetch('http://esummit.ecell.in/v1/chats/conversation',{
    //         method: 'POST',
    //         headers: {
    //              Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             from_name:name
    // }),
    //     })
    //     .then((response)=>response.json())
    //     .then((responseJson)=>{
    //         this.setState({
    //             chats:responseJson,
    //         });
    //         ToastAndroid.showWithGravityAndOffset(
    //             "fetching",
    //             ToastAndroid.SHORT,
    //             ToastAndroid.TOP,
    //             0,
    //             40);
            
    //     })
        // this._storedata();
    }
    
    componentDidMount(){
        this._retrievedata();
        // this._storedata()
    //     fetch('http://esummit.ecell.in/v1/chats/conversation',{
    //         method: 'POST',
    //         headers: {
    //              Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             from_name:name
    // }),
    //     })
    //     .then((response)=>response.json())
    //     .then((responseJson)=>{
    //         this.setState({
    //             chats:responseJson,
    //         });
    //         this._storedata();
    //     })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            
            this.props.navigation.goBack(null);
            return true;
        
      });
        
    }
    customRenderFunction(item){
        return(
            
                <View style={styles.chat}>
                    <Text style={styles.tchat}>{item.message}</Text>
                </View>
            
        )
    }
    render(){
        const { navigation } = this.props;
        name = navigation.getParam('from_name', 'Disruptor');
        return(
            <View style={styles.container}>
                <FlatList
                data = {this.state.chats}
                renderItem = {({item})=> this.customRenderFunction(item)}
                />
            </View>
        )
    }
        
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
    },
    chat:{
        backgroundColor:'#5481c9',
        // backgroundVisibility:0.2,
        padding:10,
        marginBottom: 10,
        borderRadius: 16,
        width:'40%',
    },
    tchat:{
        fontSize:16,
    }
})