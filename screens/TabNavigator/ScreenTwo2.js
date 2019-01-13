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
} from "react-native";
import GradientButton from 'react-native-gradient-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Font} from 'expo';
import onCheckBoxImage from './icons/checked.png';
import offCheckBoxImage from './icons/unchecked.png';
import {ToastAndroid} from 'react-native';
import styles from '../styles';
var checkDict = {};
var styleCheckBox = {};
var url;
let numColumns = 1;
var no_renders=0;

class ScreenTwo2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            modalVisible:false,
            seed:1,
            refreshing:false,
            Dict:{},
            CheckBoxStyle:{},
            ontLoading:true,

            screen:0,
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
        console.log(str);
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
    
    async componentDidMount(){
            fetch('http://esummit.ecell.in/v1/api/events/myevents/2')
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.setState({
                    isLoading:false,
                    dataSource: responseJson,
                    refreshing: false,
                })
            })
            .catch((error)=>{
                ToastAndroid.showWithGravityAndOffset(
                    "Unable to connect to internet",
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    40);
            }).then(()=>{
                console.log(this.state.dataSource.length);
                for(let i=0;i<this.state.dataSource.length;++i){
                    checkDict[String(this.state.dataSource[i].event_id)] = true;
                    console.log(this.state.dataSource[i].event_id);
                }
                this.setState({
                    Dict:checkDict,
                });
            })
        }
    CallMyEventsApi(evt_id){
        fetch('http://esummit.ecell.in/v1/api/events/myevent_add', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_id: evt_id,
            user_id: 2,
        }),
        }).then(()=>{
            checkDict[String(evt_id)]!=checkDict[String(evt_id)];
            this.setState({
                Dict:checkDict,
            })
        })
    .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
            String(error),
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40);
    }).then(()=>{
        console.log(String(this.props.screenProps.user_name));
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
    onClickStar = (item) => {
        this.props.screenProps.handleClick(item.event_id);
        this.setState({seed:2});
        ToastAndroid.showWithGravityAndOffset(
            this.props.screenProps.checkDict[String(item.event_id)]?'Removing...':'Adding...',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0,
            40,
        )
    };
    customRenderFunction = ((item)=>{
        if(String(item.date).slice(8,10)=='18'){
            return(
                <View elevation={10} style={item.updated?styles.customitem:styles.item}>
                    <View style={styles.touchableContainer}> 
                      <TouchableHighlight>    
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
                                    <TouchableNativeFeedback onPress = {()=>{this.onClickStar(item)}}>
                                        <View>
                                            <Image style={{height:30,width:30}} source={this.props.screenProps.checkDict[String(item.event_id)]?onCheckBoxImage:offCheckBoxImage}/>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.itemInfoText}>{item.event_type}</Text>
                            </View>
                          </View>
                      </TouchableHighlight>
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
                                    <Image style={{height:20,width:20,marginTop:2,marginLeft:15,}}source={require('./icons/imagetime.png')}/>
                                </View>
                                <View style={{flex:8}}>
                                    <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular'}}>{this.getTime(String(item.start_time),String(item.date))}</Text>
                                </View>
                            </View>    
                        </View>
                </View>
            )
        }
    })
    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex:1}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={{flex:1}}>
                <FlatList 
                data = {this.props.screenProps.myEventsSource}
                extraData = {this.props}
                style = {styles.container}
                numColumns = {numColumns}
                refreshing = {this.state.refreshing}
                onRefresh = {this.handleRefresh}
                renderItem = {({item})=>this.customRenderFunction(item)}/>

                 {this.state.screen == 1? this.screen(): null }

                </View>
        );
    }
}
export default ScreenTwo2;