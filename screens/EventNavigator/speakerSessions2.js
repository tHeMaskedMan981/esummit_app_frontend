import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableHighlight,
    Modal,
    Linking,
    TouchableNativeFeedback,
    Platform,
    Image,
    CheckBox,
    BackHandler,
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import {Font} from 'expo';
import GradientButton from 'react-native-gradient-buttons';
import onCheckBoxImage from '../../assets/images/icons/checked.png';
import offCheckBoxImage from '../../assets/images/icons/unchecked.png';
import {ToastAndroid} from 'react-native';
import styles from '../styles';
import EventScreen from './EventScreen';
 var Arr = [];
 var checkDict = {};
 var styleCheckBox = {};
 var url;
 let numColumns = 1;

class Speaker2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
        };
    }

    componentDidMount(){
        this.setState({isLoading:false});
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            
            this.props.navigation.goBack(null);
            return true;
        
      });
    }

    render() {
        
        if(this.state.isLoading){
            return(
                <View style={{flex:1}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <EventScreen 
            handleRefresh={this.props.screenProps.handleRefresh} 
            day='day2' 
            event_type="speaker" 
            dataSource = {this.props.screenProps.dataSource} 
            handleClick={this.props.screenProps.handleClick} 
            checkDict={this.props.screenProps.checkDict}
             />
        );
    }
}
export default Speaker2;