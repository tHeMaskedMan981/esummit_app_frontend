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
import { Constants, WebBrowser } from 'expo';
import {Font} from 'expo';
import onCheckBoxImage from './icons/checked.png';
import offCheckBoxImage from './icons/unchecked.png';
import {ToastAndroid} from 'react-native';
import styles from '../styles';
import EventScreen from './EventScreen';
 var Arr = [];
 var checkDict = {};
 var styleCheckBox = {};
 var url;
 let numColumns = 1;
 var no_renders=0;
class ScreenThree2 extends Component {
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
            fontLoading:true,
        };
    }
    componentDidMount(){
        fetch('http://esummit.ecell.in/v1/api/events')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                isLoading:false,
                dataSource: responseJson,
                refreshing:false},
                function(){

                });
        }).catch(()=>{
            ToastAndroid.showWithGravityAndOffset(
                "Unable to connect to internet",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                40);
        })
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
    customRenderFunction(item){
        console.log("hilalalalalla"+ item.name + item.day);
        if(item.updated == true && String(item.day)=='day2'){
            return(

                <EventScreen item={item} checkDict={this.props.screenProps.checkDict} />

                // <View style={styles.item}>
                    
                //     <View style={styles.touchableContainer}> 
                //       <TouchableHighlight>    
                //           <View style={{flex:2}}>  
                //             <View style={styles.heading}>
                //                 <View style={styles.titleFlex}>
                //                     <Text style={styles.itemText}>{item.name}</Text>
                //                 </View>
                //                 <View style={styles.checkBoxFlex}>
                //                     <TouchableNativeFeedback onPress = {()=>{this.onClickStar(item)}}>
                //                         <View>
                //                             <Image style={{height:15,width:15}} source={this.props.screenProps.checkDict[String(item.event_id)]?onCheckBoxImage:offCheckBoxImage}/>
                //                         </View>
                //                     </TouchableNativeFeedback>
                //                 </View>
                //             </View>
                //             <View>
                //                 <Text style={styles.itemInfoText}>{item.event_type}</Text>
                //             </View>
                //           </View>
                //       </TouchableHighlight>
                //     </View>    
                //         <View style={styles.footer}>
                //             <TouchableNativeFeedback
                //                 onPress ={()=>{Linking.openURL(String(item.venue_url))}}
                //                 background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                //                 <View style={styles.innerFooter}>
                //                     <View style={{flex:1}}>
                //                         <Image style={{height:20,width:20,marginTop:2}}source={require('./icons/image.png')}/>
                //                     </View>
                //                     <View style={{flex:8}}>
                //                         <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular'}}>{item.venue_name}</Text>
                //                     </View>    
                //                 </View>
                //             </TouchableNativeFeedback>
                //             <View style={styles.innerFooterInvisible}>
                //                 <View style={{flex:1}}>
                //                     <Image style={{height:20,width:20,marginTop:2,marginLeft:15,}}source={require('./icons/imagetime.png')}/>
                //                 </View>
                //                 <View style={{flex:8}}>
                //                     <Text style={{color:'white',textAlign:'center',fontFamily:'latoRegular'}}>{this.getTime(String(item.start_time),String(item.date))}</Text>
                //                 </View>
                //             </View>    
                //         </View>
                // </View>
            );
        }
    };
    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex:1}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
                <FlatList 
                extraData = {this.props}
                data = {this.state.dataSource}
                style = {styles.container}
                numColumns= {numColumns}
                refreshing = {this.state.refreshing}
                onRefresh = {this.handleRefresh}
                renderItem = {({item}) => this.customRenderFunction(item)   
            }/>
        );
    }
}
export default ScreenThree2;