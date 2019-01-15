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
    BackHandler,
} from "react-native";

import { WebView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import GradientButton from 'react-native-gradient-buttons';
import { Constants, WebBrowser } from 'expo';
import {CheckBox, Icon} from 'react-native-elements';

import {HomeScreen} from '../HomeScreen';
import {Font} from 'expo';
import onCheckBoxImage from './icons/checked.png';
import offCheckBoxImage from './icons/unchecked.png';
import {ToastAndroid} from 'react-native';
import LoadingGIF from "../LoadingGIF";
import styles from '../styles';

 var Arr = [];
 var checkDict = {};
 var styleCheckBox = {};
 var url;
 let numColumns = 1;
 var no_renders=0;

class ScreenOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            modalVisible:false,
            refreshing:false,
            seed:1,
            trackHighlightEvents:false,
            trackMyEvents:false,
            Dict:{},

            screen:0,
            event_name:'',
            event_desc:'',
            event_photo_url:'',
            event_web:'',
            event_type:'',
            event_id:'',
            likes:'',

            CheckBoxStyle:{},
            fontLoading:true,

        };
        
    }

    async componentDidMount(){
        await Font.loadAsync({
            'latoRegular':require('../../assets/fonts/Lato-Regular.ttf')
        }).then(()=>{
            this.setState({
                fontLoading:false,
            })
        }).then(()=>{
            this.setState({
                isLoading:true,
            });
            
            fetch('http://esummit.ecell.in/v1/api/events')
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.setState({
                    isLoading:false,
                    dataSource: responseJson,
                    refreshing: false,
                });
                // console.log(JSON.stringify(responseJson) )
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
                checkDict = this.props.screenProps.checkDict;
            })
        })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            
                BackHandler.exitApp ;
                return true;
            
          });
    }
    handleRefresh = () => {
        this.setState({
            refreshing:true,
            seed: this.state.seed + 1,
        },
        () => {
            this.componentDidMount();
        }
        );
    };

    settingstate(item){
        fetch('http://esummit.ecell.in/v1/api/events/likes',{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    event_id : String(item.event_id),
                }),
            }).then((response)=>response.json())
            .then((responseJson) => {
                
            this.setState({
                likes:responseJson.people_going,
                screen:1,
                event_desc:item.description,
                event_name:item.name,
                event_web:String(item.website_url),
                event_type:String(item.event_type),
                event_id:String(item.event_id),                        
            })            
            })
            if (this.state.event_type == 'competitions') {
                this.setState({
                    event_photo_url:'../../assets/images/Compi.png'
                })
            } 
            else if(this.state.event_type == 'speaker'){
                this.setState({
                    event_photo_url:'../../assets/images/robot-dev.png'
                })
            }
            else {
                this.setState({
                    event_photo_url:'../../assets/images/robot-prod.png'
                })
            }
            
            

    }
    screen(){
        return(
            <View style={styles.screen}>
            <View style={styles.screen_box}>
            <View style={styles.vcross}>
            <TouchableNativeFeedback onPress={()=>{this.setState({
                screen:0,
            })}}>
                <Ionicons name='md-close' size={24}/>
            </TouchableNativeFeedback>
            </View>
            <View style={styles.screen_image}>
                <Image 
                source={require('../../assets/images/Compi.png')}
                
                style={styles.image}
                />
            </View>
            <View style={styles.screen_desc}>
                <Text style={styles.screen_name}>{this.state.event_name}</Text>
                <View style={{flexDirection:'row'}}>
                <Ionicons name="ios-heart" size={29} style={{color:"#e24f6f"}}/>
                <Text style={{fontSize:22,marginLeft:10}}>{this.state.likes}</Text>
                </View>
                <Text>{this.state.event_desc}</Text>
            </View>
            <View style={styles.vbutn}>
            <GradientButton 
                text='Learn More'
                gradientBegin="#6673a4"
                gradientEnd="#6673a4"
                textStyle={{ fontSize: 14 }}
                height={'70%'}
                width={'34%'}
                impact='True'
                impactStyle = 'Light'
                onPressAction={()=>{Linking.openURL(this.state.event_web)}}
            />
           </View>
            </View>
            </View>
        )
    }

    getTime(time,date){
        //extract the day from date
        let str = date.slice(8,10);
        let res = '';
        if(str == '17'){
            res = 'Day 1';
        }
        else if(str == '18'){
            res = 'Day 2';
        }
        if(time[0]=='0'){
            return String(time.slice(1,5) + ' , ' + res);
        }
        else{
            return String(time.slice(0,5) + ' , ' + res);
        }
    }
    onClickStar=((item)=>{
        this.props.screenProps.handleClick(item.event_id);
        this.setState({seed:2});
        ToastAndroid.showWithGravityAndOffset(
            this.props.screenProps.checkDict[String(item.event_id)]?'Removing...':'Adding...',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40,
        );
    })
    customRenderFunction(item){
        if(String(item.day)=='day1' && item.highlight==true){
            return(
                
                <View  style={item.updated?styles.customitem:styles.item}>
                    <View style={styles.touchableContainer}>  
                          <View style={{flex:2}}>  
                            <View style={styles.heading}>
                                <TouchableNativeFeedback onPress = {()=>{
                                    this.settingstate(item)
                                }}>
                                    <View style={styles.titleFlex}>
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <View style={styles.checkBoxFlex}>
                                    <TouchableNativeFeedback onPress = {()=>{this.onClickStar(item)}} >
                                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                            <Image style={{height:15,width:15,marginTop:5,marginLeft:2}} source={this.props.screenProps.checkDict[String(item.event_id)]?onCheckBoxImage:offCheckBoxImage}/>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.itemInfoText}>{item.event_type}</Text>
                            </View>
                          </View>
                    </View>    
                        <View style={styles.footer}>
                            <TouchableNativeFeedback
                                onPress ={()=>{Linking.openURL(String(item.venue_url))}}
                                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                                <View style={styles.innerFooter}>
                                    <View style={{flex:1}}>
                                        <Image style={{height:20,width:20,marginTop:2}}source={require('./icons/image.png')}/>
                                    </View>
                                    <View style={{flex:8}}>
                                        <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular'}}>{item.venue_name}</Text>
                                    </View>    
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.innerFooterInvisible}>
                                <View style={{flex:1}}>
                                    <Image style={{height:20,width:20,marginTop:2,marginLeft:15,fontFamily:'latoRegular'}}source={require('./icons/imagetime.png')}/>
                                </View>
                                <View style={{flex:8}}>
                                    <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular'}}>{this.getTime(String(item.start_time),String(item.date))}</Text>
                                </View>
                            </View>    
                        </View>
                </View>
            )
        }
    }
    render() {

        checkDict = this.props.screenProps.checkDict;
        no_renders+=1;

        if(this.state.isLoading||this.state.fontLoading){
            return(
                <View style={{flex:1}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (

            <View style={{flex:1}}>
            <LoadingGIF show={this.state.isLoading} />

                {/* <Text> the value of count is : { this.props.screenProps.count}</Text> */}
                <FlatList 
                data = {this.state.dataSource}
                style = {styles.container}
                numColumns= {numColumns}
                refreshing = {this.state.refreshing}
                onRefresh = {this.handleRefresh}
                extraData = {this.props}
                renderItem = {({item}) => this.customRenderFunction(item)}   
            />
            
            {this.state.screen == 1? this.screen(): null }
        
            </View>
                
        );
    }
}
export default ScreenOne;
