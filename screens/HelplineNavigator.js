import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Constants, WebBrowser } from 'expo';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import HelplineScreen from './HelplineScreen';

export default class HelplineScreen extends Component {
    
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

            <View style={{flex: 1, flexDirection:'column'}}>
       <View style={{height:50, flexDirection:'row', justifyContent:'center', marginTop:5,  backgroundColor: '#639fff',}}><Text style={{fontSize: 30,}}> Hospital</Text></View>
            <View style={{flex: 0.5,  flexDirection:'row', justifyContent: "space-around"}}>
                
               <View style={{ flex:0.5, justifyContent: 'flex-start',paddingLeft:8}}>
                <Text style={{fontSize: 20, marginVertical:7}}>Ambulance</Text> 
                <Text style={{fontSize: 20, marginVertical:7}}>Visiting Doctors</Text>
                <Text style={{fontSize: 20, marginVertical:7}}> IITB Hospital</Text>
                <Text style={{fontSize: 20, marginVertical:7}}>
        
                </Text>
                   <Text style={{fontSize: 20}}></Text>       
            </View>
            <View style={{ flex:0.5, justifyContent: 'flex-start'}}>
            <Text style={{fontSize: 20, marginVertical:7,}}>1101</Text>
            <Text style={{fontSize: 20, marginVertical:7,}}>7053</Text>
            <Text style={{fontSize: 20, marginVertical:7,}}>+91-2225722149</Text>
            <Text style={{fontSize: 20, marginVertical:7,}}>1110</Text>
            <Text style={{fontSize: 20, marginVertical:7,}}>7051</Text>
            </View>
            </View>

            <View style={{height:50, flexDirection:'row', justifyContent:'center', backgroundColor: '#639fff',}}><Text style={{fontSize: 30}}> Security Section</Text></View>
            <View style={{flex: 0.5,  flexDirection:'row', justifyContent: "space-around"}}>
                
               <View style={{ flex:0.5, justifyContent: 'flex-start',paddingLeft:8}}>
                <Text style={{fontSize: 20, marginVertical:7}}>Main Gate</Text> 
                <Text style={{fontSize: 20, marginVertical:7}}>  </Text>       
                <Text style={{fontSize: 20, marginVertical:7}}>Office</Text>
                <Text style={{fontSize: 20, marginVertical:7}}>Police Station Powai</Text>
                <Text style={{fontSize: 20, marginVertical:7}}>Fire Control Room</Text>
                   
            </View>
            <View style={{ flex:0.5, justifyContent: 'flex-start'}}>
            <Text style={{fontSize: 20, marginVertical:7}}>7051</Text>
            <Text style={{fontSize: 20, marginVertical:7}}>1110</Text>
            <Text style={{fontSize: 20, marginVertical:7}}>8989</Text>
            <Text style={{fontSize: 20, marginVertical:7}}>022 25702690</Text>
            <Text style={{fontSize: 20, marginVertical:7}}>022 23076111</Text>
            </View>
            </View>
            </View>
        );
    }
}
// export default HelplineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

