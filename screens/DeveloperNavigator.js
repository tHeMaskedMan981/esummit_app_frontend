import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { Component } from "react";
import { Row } from "native-base";
import {
    View,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
    ToastAndroid,
    ScrollView,
    Dimensions,
} from "react-native";
import akash from '../assets/images/akash.jpg'
import inder from '../assets/images/inder.jpg'
import prajwal from '../assets/images/prajwal.jpg'
import anvay from '../assets/images/anvay.jpg'
// import DeveloperScreen from './DeveloperScreen'
var image_width = (Dimensions.get('window').width-40)/2;
class Developer extends Component{
    render(){
        return(
            <View style={styles.vname}>
                <View style={styles.imageContainer}>

                </View>
            </View>
        )
    }
}

class DeveloperScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Developer",
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#221d3d',
              },
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} color='white' onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
        }
    }
    render() {
        return (
            <ScrollView>    
                <View style={styles.container}>
                        <View style={styles.class}>
                            <Text style={styles.tclass}>Programmers</Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.name}>
                                <Developer name='Akash' designation='Manager' imageVariable={akash}/>
                                <Developer name='Inderjeet' designation='Coordinator' imageVariable={inder}/>
                            </View>
                            <View style={styles.name}>
                                <Developer name='Prajwal' designation='Coordinator' imageVariable={prajwal}/>
                                <Developer name='Anvay' designation='Coordinator' imageVariable={anvay}/>
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
            </ScrollView>
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
    content:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-evenly',
    },
    class:{
        backgroundColor:'#6674a3',
        alignItems: 'center',
        justifyContent: 'center',
        width:'95%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#dce0a3',
        paddingTop:5,
        paddingBottom:5,
        marginTop:5,
    },
    tclass:{
        fontSize:28,
        fontWeight:"600",
        color:'white',
    },
    name:{
        flexDirection:'row',
        // marginBottom:20,
        padding:15,
        justifyContent:'space-evenly'

    },
    vname:{
        margin:10,
        width:'49%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',
        height:200,
        borderRadius:10,
        backgroundColor:'#93a0cc',
    },
    tname:{
        fontSize:24,
        fontWeight:"400",
        marginBottom:15,
        textAlign:'center',
        color:'white',

    },
    ttname:{
        fontSize:16,
        fontWeight:"100",
        marginBottom:15,
        color:'white',
    },
    header:{
        paddingTop:10,
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    footer:{
        flex:0.75,
        alignItems:'center',
        justifyContent:'center',
    },
    imageContainer:{
        flex:4,
    }
});