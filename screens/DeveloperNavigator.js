import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
     Button
} from "react-native";

import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Row } from "native-base";
// import DeveloperScreen from './DeveloperScreen'

class DeveloperScreen extends Component {

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
            <View style={styles.container}>
                {/* <Text>DeveloperScreen</Text>
                <Text> the value of count is :  {this.props.screenProps.count}</Text>
                <Button title ="increase the count" onPress={this.props.screenProps.handleClick}></Button> */}
               
                    <View style={styles.class}>
                        <Text style={styles.tclass}>Programmers</Text>
                    </View>
                    <View style={styles.name}>
                    <View style={styles.vname}>
                        <Text style={styles.tname}>Akash</Text>
                        <Text>Manager</Text>
                    </View>
                    <View style={styles.vname}>
                        <Text style={styles.tname}>Prajwal</Text>
                        <Text>Coordinator</Text>
                    </View>
                    </View>
                    <View style={styles.name}>
                    <View style={styles.vname}>
                        <Text style={styles.tname}>Inderjeet</Text>
                        <Text >Coordinator</Text>
                    </View>
                    <View style={styles.vname}>
                        <Text style={styles.tname}>Anvay</Text>
                        <Text>Coordinator</Text>
                    </View>
                    </View>
                
                
                    <View style={styles.class}>
                        <Text style={styles.tclass}>Design</Text>
                    </View>
                    <View style={styles.name}>
                    <View style={styles.vname}>
                        <Text style={styles.tname}>Rashi</Text>
                        <Text>Manager</Text>
                    </View>
                    <View style={styles.vname}>
                        <Text style={styles.tname}>Prashant</Text>
                        <Text>Coordinator</Text>
                    </View>
                    </View>
                
            </View>
        );
    }
}
export default DeveloperScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    class:{
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        // marginBottom:20,
    },
    tclass:{
        fontSize:32,
        fontWeight:"600",
    },
    name:{
        flexDirection:'row',
        // marginBottom:20,
        padding:15,
        
    },
    vname:{
        margin:15,
        width:'45%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        height:125,
        padding:15,
        borderRadius:10,
        backgroundColor:'white',
    },
    tname:{
        fontSize:24,
        fontWeight:"400",
        marginBottom:15,

    },
    ttname:{
        fontSize:16,
        fontWeight:"100",
        marginBottom:15,
    }

});