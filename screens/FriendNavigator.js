import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableNativeFeedback
} from "react-native";

import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ChatNavigator from './ChatNavigator'

const ChatStackNavigator = new createStackNavigator({
    ChatNavigator :{
        screen:ChatNavigator
    }
})

export default class FriendNavigator extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Messaging",
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

    constructor(props){
        super(props);
        this.state ={

        }
        this.customRenderFunction=this.customRenderFunction.bind(this);
        this.navigate = this.navigate.bind(this);
    }
    componentDidMount(){
        fetch('http://esummit.ecell.in/v1/api/friends')
    .then((response)=>(response.json()))
    .then((responseJson)=>{
        this.setState({
            dataSource:responseJson,
        });
    })
    }
    navigate(item){
        this.props.navigation.navigate('ChatNavigator',{
            from_name:item.name,
        })
    }
    customRenderFunction(item){
        return(
            <TouchableNativeFeedback onPress={()=>{this.navigate(item)}}>
                <View style={styles.person}>
                    <View style={styles.img}>
                        <Ionicons name="ios-person" size={36} />
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.tname}>{item.name}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList 
                data = {this.state.dataSource}
                renderItem = {({item}) => this.customRenderFunction(item)}
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
    person:{
        textAlign:'left',
        justifyContent:'center',
        flex:1,
        flexDirection: 'row',
        height:70,
        marginBottom: 10,
    },
    img:{
        flex:1,
        justifyContent:'center',
        
        
    },
    name:{
        flex:8,
        justifyContent:'center',
        // alignItems: 'center', 
    },
    tname:{
        fontSize:28,
        fontWeight:"400",
    }
})