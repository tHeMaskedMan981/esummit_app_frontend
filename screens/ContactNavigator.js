import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, 
    FlatList,
    ActivityIndicator,
    WebView,
    Image,
    TouchableHighlight,
    Linking,
    TouchableNativeFeedback
} from "react-native";
import {
    List,
    ListItem,
} from "react-native-elements"
import {Permissions} from 'expo';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header, Left, Icon } from "native-base";
import { stringify } from "qs";
// import SponsorScreen from './SponsorScreen';

class ContactScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
    
    static navigationOptions = ({ navigation }) => {
        
                return {
                    title:'Speakers',
                    headerLeft: (
                        <View style={{ padding: 10 }}>
                            <Ionicons name="md-menu" size={44} onPress={() => navigation.openDrawer()} />
                        </View>
                    )
                }
            }

            componentDidMount(){
                return fetch('http://esummit.ecell.in/v1/api/speakers')
                  .then((response) => response.json())
                  .then((responseJson) => {
            
                    this.setState({
                      isLoading: false,
                      dataSource: responseJson,
                    }, function(){
            
                    });
            
                  })
                  .catch((error) =>{
                    console.error(error);
                  });
              }
              
    render() {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
    
          return(
            <View style={{flex: 1, paddingTop:20}}>
              <FlatList
                data={this.state.dataSource}
                scrollEnabled={this.state.scrollEnabled}
                
                renderItem={({item}) =>{
                return( 
                <View style={{flex:1, justifyContent:"center", alignItems:"center", paddingBottom:15,}}>
                <TouchableNativeFeedback onPress={() => Linking.openURL(item.limkedin_link.toString())}>

                <Image style={{width: 150, aspectRatio: 1,}} source={{uri: item.photo_url.toString()}}/>   
                </TouchableNativeFeedback>     
                <Text style={{ color:'black',fontSize:25, fontWeight:'bold',textAlign:"center", paddingBottom:5}}>{item.name}</Text>
                <Text style={{ color:'grey',fontSize:15,fontWeight:'normal', textAlign:'center', paddingBottom:20}}>{item.designation}, {item.company}</Text>
                </View>) }}
                numColumns={2}
                keyExtractor={({id}, index) => id}
              />

{/* <Text style={{fontSize:40}} >Awesome</Text>
<FlatList
                data={this.state.dataSource}
                renderItem={({item}) =>{ if(item.category=='Awesome'){
                return( 
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width: 150, aspectRatio: 1,}} source={{uri: item.photo.toString()}}/>        
                <Text style={{ color:'black',fontSize:30, fontWeight:'bold',textAlign:"center"}}>{item.name}</Text>
                </View>) }} }
                numColumns={1}
                keyExtractor={({id}, index) => id}
              /> */}
            </View>
          );
    }
}
export default ContactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 1,
        marginTop:10,
        backgroundColor:'#fff',
    }
});



































