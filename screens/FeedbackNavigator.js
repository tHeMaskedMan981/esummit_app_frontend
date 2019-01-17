import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage, Image , ToastAndroid, TouchableNativeFeedback} from 'react-native';
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
                        backgroundColor: '#221d3d',
                      },
                      headerTintColor: '#fff',
                    headerLeft: (
                        <View style={{ padding: 10 }}>
                            <Ionicons name="md-menu" size={44} color='white' onPress={() => navigation.openDrawer()} />
                        </View>
                    )
                }
            }
    SendFeedback = ((sub,feedback)=>{
        if(sub == null||feedback == null||sub == ''||feedback == ''){
            Alert.alert('Invalid Entry',"Please send feedback with non-empty entries");
            return null;
        }
        ToastAndroid.showWithGravityAndOffset(
            'Sending',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40,
        )
        fetch('http://esummit.ecell.in/v1/api/feedback', {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subject: String(sub),
            description: String(feedback),
        })
        })
        .catch((error)=>{
            console.error(error);
        })
        .then(()=>{
            this.setState({
                sub:'',
                feedback:'',
            });
        })
        .then(()=>{
            ToastAndroid.showWithGravityAndOffset(
                'Sent',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40,
            );
        })
        .then(()=>{
            Alert.alert('Feedback Submitted', "Thanks a lot for providing your valuable feedback. Hope you have a great learning experience at E-Summit");
        })
    })
    clearEntry = (()=>{
        this.setState({
            sub:'',
            feedback:'',
        });
        ToastAndroid.showWithGravityAndOffset(
            'Cleared',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40,
        );
    })         
    render() {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }
    
          return(
        <View style={styles.new_welcome_container_normal}>
            <View style={styles.feedbackSubject}>
                <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>We would love to hear from you!</Text>
            </View>
            <View style={styles.inputsFeedback}>
                <TextInput
                value={this.state.sub}
                onChangeText={ (sub) => {
                    this.setState({ sub });
                    }}
                style={styles.inputSubject}
                placeholder={'Subject'}
                />

                <TextInput
                value={this.state.feedback}
                onChangeText={(feedback) => this.setState({ feedback })}
                placeholder={'Feedback'}
                multiline={true}
                style={styles.inputFeedback}
                />
            </View>
            <View style={styles.buttonFeedback}>
                <View style={styles.feedbackButtonRegion}>
                    <TouchableNativeFeedback onPress = {()=>{this.SendFeedback(this.state.sub,this.state.feedback)}}>
                        <View style={styles.feedbackButton}>
                            <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight:'bold'}}>Submit</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.feedbackButtonRegion}>
                    <TouchableNativeFeedback onPress={()=>{this.clearEntry()}}>
                        <View style={styles.feedbackButton}>
                            <Text style={{color:'white',textAlign:'center',fontSize:20,fontWeight:'bold'}}>Clear</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                
            </View>    
        </View>
          );
    }
}
export default SpeakerScreen;