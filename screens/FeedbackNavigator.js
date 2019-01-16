import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage, Image , ToastAndroid } from 'react-native';
import GradientButton from 'react-native-gradient-buttons'
import {
    List,
    ListItem,
} from "react-native-elements"
import {Permissions} from 'expo';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Header, Left, Icon } from "native-base";
import { stringify } from "qs";
import styles from './styles';
class SpeakerScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sub: null,
            feedback: null,
            submitted:false,  
          };
      }
    
    static navigationOptions = ({ navigation }) => {
        
                return {
                    title:'Feedback',
                    headerStyle: {
                        backgroundColor: 'steelblue',
                      },
                      headerTintColor: '#fff',
                    headerLeft: (
                        <View style={{ padding: 10 }}>
                            <Ionicons name="md-menu" size={44} color='white' onPress={() => navigation.openDrawer()} />
                        </View>
                    )
                }
            }

            onLogin() {

                const  sub = this.state.sub;
                const  feedback  = this.state.feedback;
            
                Alert.alert('Feedback Submitted', "Thanks a lot for providing your valuable feedback. Hope you have a great learning experience at E-Summit");
                return fetch('http://esummit.ecell.in/v1/feedback/submit', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sub: sub,
                    feedback: feedback,
                }),

                })
                .then((response) => response.json())
                .then((responseJson) => {
            
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
        <View style={styles.welcome_container_normal}>
            <View style={styles.inputs}>
                <TextInput
                value={this.state.sub}
                onChangeText={ (sub) => {
                    this.setState({ sub });
                    }}
                placeholder={'Subject'}
                style={styles.input}
                />

                <TextInput
                multiline = {true}
                numberOfLines = {4}
                value={this.state.feedback}
                onChangeText={(feedback) => this.setState({ feedback })}
                placeholder={'Feedback'}
                style={styles.input}
                />
            </View>
            <View style={styles.buttons}>
                <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:1}}>
                <GradientButton
                style= {styles.binput1}
                textStyle={{ fontSize: 24 }}
                text="Submit"
                height={40}
                gradientBegin="#6673a4"
                gradientEnd="#6673a4"
                impact='True'
                impactStyle = 'Light'
                onPressAction={this.onLogin.bind(this)}
                />
                </View>
                <View style={{flex:1}}>
                <GradientButton
                style= {styles.binput1}
                textStyle={{ fontSize: 24 }}
                text="Clear"
                height={40}
                gradientBegin="#6673a4"
                gradientEnd="#6673a4"
                impact='True'
                impactStyle = 'Light'
                onPressAction={() =>
                    this.setState({
                        sub:"" ,
                        feedback:""})}
                />
                </View></View>
                
                
                
            </View>    
        </View>
          );
    }
}
export default SpeakerScreen;


































