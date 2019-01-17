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
    RefreshControl
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import {Font} from 'expo';

import GradientButton from 'react-native-gradient-buttons';
import onCheckBoxImage from '../../assets/images/icons/checked.png';
import offCheckBoxImage from '../../assets/images/icons/unchecked.png';
import {ToastAndroid} from 'react-native';
import styles from '../styles';
 var Arr = [];
 var checkDict = {};
 var styleCheckBox = {};
 var url;
 let numColumns = 1;
 var no_renders=0;
class EventScreen extends Component {
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
            CheckBoxStyle:{},
            screen:0,
            fontLoading:true,
            event_name:'',
            event_desc:'',
            event_photo_url:'',
            event_web:'',
            event_type:'',
            event_id:'',
            likes:'',
        };
    }
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
                // event_photo_url:String(item.image_url),
                event_web:String(item.website_url),
                event_type:String(item.event_type),
                event_id:String(item.event_id),                        
            })
                

            console.log(this.state.likes);
            
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
        console.log('inside screen');
        console.log(this.state.event_photo_url);
        console.log(this.state.likes);
        console.log(this.state.event_id);

        return(
            <View style={styles.screen}>
            <View style={styles.screen_box}>
            <View style={styles.vcross}>
            <TouchableNativeFeedback onPress={()=>{this.setState({
                screen:0,
            })}}>
                <Ionicons name='md-close' size={30}/>
            </TouchableNativeFeedback>
            </View>
            <View style={styles.screen_desc}>
            {/* <View style={{backgroundColor:'#221d3d'}}> */}
            <Text style={styles.screen_name}>{this.state.event_name}</Text>
            </View>
            <View style={{margin:10, textAlign:'justify'}}>
               <Text style={{fontSize:15}} >{this.state.event_desc}</Text>
            </View>
                
            

            </View>
            </View>
        )
    }
    getTime(time,date){
        //extract the day from date
        let str = date.slice(8,10);
        console.log(str);
        let res = '';
        if(time[0]=='0'){
            return String(time.slice(1,5));
        }
        else{
            return String(time.slice(0,5));
        }
    }
    handleRefresh = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Updating...',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40,
        )
        this.setState({refreshing: true});
        console.log("handle refresh event screen  called");
      this.setState({refreshing: false});
        this.props.handleRefresh();
    };

    onClickStar = (item) => {
        this.props.handleClick(item.event_id);
        this.setState({seed:2});
        ToastAndroid.showWithGravityAndOffset(
            this.props.screenProps.checkDict[String(item.event_id)]?'Removing...':'Adding...',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40,
        )
    };
    customRenderFunction(item){
        console.log(item.name);
        if(item.highlight==true && String(item.day)==this.props.day){
            return(
                <View  style={item.updated?styles.customitem:styles.item}>
                    
            <View style={styles.touchableContainer}> 
              <TouchableHighlight>    
                  <View style={{flex:1}}>  
                    <View style={styles.heading}>
                    {/* name of the event */}
                        <View style={styles.titleFlex}>
                            <TouchableNativeFeedback onPress = {()=>{this.settingstate(item)}}>
                                    
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    
                            </TouchableNativeFeedback>
                        </View>    
                        {/* star image.  */}
                        <View style={styles.checkBoxFlex}>
                                <TouchableNativeFeedback onPress = {()=>{this.onClickStar(item)}}>
                                    <View>
                                        <Text style={{fontWeight:'bold',}} >{item.updated?'Updated':''}</Text>
                                        {/* <Image style={{height:15,width:15}} source={this.props.checkDict[String(item.event_id)]?onCheckBoxImage:offCheckBoxImage}/> */}
                                    </View>
                                </TouchableNativeFeedback>
                        </View>
                    </View>
                    {/* event type */}
                    <View>
                        <Text style={styles.itemInfoText}>{item.event_type=='speaker'?item.speaker:item.event_type}</Text>
                    </View>
                  </View>
              </TouchableHighlight>
            </View>    
            <View style={styles.footer}>
                {/* Venue  */}
                <View style={{flex:2}}>
                <TouchableNativeFeedback
                    onPress ={()=>{
                        Linking.openURL(String(item.venue_url))
                    }}
                    background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <View style={styles.innerFooter}>
                        <View style={{flex:2,justifyContent:'center', alignItems:'center',}}>
                            {/* <Image style={{height:20,width:20,margin:2}}source={require('./icons/image.png')}/> */}
                            <Ionicons name="md-compass" size={20} color='white'/>
                        </View>
                        <View style={{flex:6, justifyContent:'center', alignItems:'center',}}>
                            <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular',fontWeight:'bold',}}>{item.venue_name}</Text>
                        </View>    
                    </View>
                </TouchableNativeFeedback>
                </View> 
                {/* time */}
                <View style={styles.innerFooterInvisible}>
                    <View style={{flex:2, margin:5, padding:10}} >
                    <Ionicons name="md-time" size={20} color='white'/>
                        {/* <Image style={{height:20,width:20,marginTop:2,marginLeft:15,}}source={require('./icons/imagetime.png')}/> */}
                    </View>
                    <View style={{flex:6}}>
                        <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular',fontWeight:'bold',}}>{this.getTime(String(item.start_time),String(item.date))}</Text>
                    </View>
                </View>    
            </View>
        </View>
            );
        }
    };

    render() {

        return (
            
            <View style={{flex:1}}>
            <FlatList 
            extraData = {this.props}
            data = {this.props.dataSource}
            style = {styles.container}
            numColumns= {numColumns}
            refreshing = {this.state.refreshing}
            onRefresh = {this.handleRefresh}
            renderItem = {({item}) => this.customRenderFunction(item) 
        }/>
        {this.state.screen == 1? this.screen(): null }
    
    </View>
            
        );
    }
}
export default EventScreen;