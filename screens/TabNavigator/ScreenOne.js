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
} from "react-native";
import { Constants, WebBrowser } from 'expo';
import {CheckBox} from 'react-native-elements';
 var Arr = [];
 var checkDict = {};
 var url;
 let numColumns = 1;
// const formatData = (dataSource,numColumns) =>{
//     const numberOfFullRows = Math.floor(dataSource.length/numColumns);
//     let numberOfElementsLastRow = dataSource.length - (numberOfFullRows*numColumns);
//     while(numberOfElementsLastRow !== numColumns && numberOfElementsLastRow==0){
//         dataSource.push({day:'blank-${numberOfElementsLastRow}',empty:true});
//         numberOfElementsLastRow += 1;
//     }
//     return dataSource;
// }

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
        };
    }
    venueFetch = (venue_id)=>{
        // fetch('http://esummit.ecell.in/v1/venues')
        // .then((response) => response.json())
        // .then((responseJson)=>{
        //     console.log(responseJson.stringify());
        //     this.setState({},
        //         function(){
        //             for( var i in responseJson){
        //                 Arr.push(i);
        //             }
        //         });
        // })
        fetch('http://esummit.ecell.in/v1/api/venues').then(response => {
        if (response.ok) {
            console.log('fine response');
            return response.json();
        }
        throw new Error('Network response error.');
    })
    .then(charData => {
        //console.log(`inside: ${JSON.stringify(charData, null, 2)}`);
        console.log('inside chardata');
        charData.map(entry => {
            console.log(JSON.stringify(entry));
            return Arr.push(entry);
        });
        //console.log(`outside: ${JSON.stringify(Arr, null, 2)}`);
    }).then(()=>{
        for(let i=0;i<Arr.length;++i){
            if(venue_id==Arr[i].venue_id){
                url = Arr[i].url;
                console.log(String(url));
                Linking.openURL(String(url));
            }
        }
    })
//console.log(`outside: ${JSON.stringify(Arr, null, 2)}`);
    }
    returnVenueUrl(venue){
        console.log(Arr.length);
        for(let i = 0;i<Arr.length;++i){
            console.log(i);
            if(venue==(Arr[i]).venue_id){
                console.log((Arr[i]).venue_id);
                return (Arr[i]).url;
            }
        }
    }

    _handlePressButtonAsync = async (venue_id) => {
        if(Arr.length == 0){
            this.venueFetch(venue_id);
        }
        else{
            url = this.returnVenueUrl(venue_id);
            Linking.openURL(String(url));
        }
        console.log("inside");
        // let result = await WebBrowser.openBrowserAsync(url);
        // this.setState({ result });
    };
    toggleModal(visible){
        this.setState({modalVisible:visible});
    }
    componentDidMount(){
        fetch('http://esummit.ecell.in/v1/api/events')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                isLoading:false,
                dataSource: responseJson,
                refreshing:false,
                trackHighlightEvents:true,});
                console.log('highlight entered');
        }).then(
            ()=>{this.initializeCheckDict();
                console.log(this.state.trackHighlightEvents);
                console.log(this.state.trackMyEvents);
            }
        )
        // while(true){
        //     if(this.state.trackHighlightEvents && this.state.trackMyEvents){
        //         console.log('inside if');
        //         break;
        //     }
        //     console.log('outside if');
        //     break;
            
        // }
        // console.log('loop break');
    }
    initializeCheckDict(){
        fetch('http://esummit.ecell.in/v1/api/events/myevents/2')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                myEventsSource: responseJson,
                trackMyEvents:true,
            });
            console.log('myevents checked');
        }).then(()=>{
            // console.log(JSON.stringify(this.state.myEventsSource));
            // console.log(JSON.stringify(this.state.dataSource));
            console.log(JSON.stringify(this.state.myEventsSource[0]));
            for(let i=0;i<this.state.myEventsSource.length;++i){
                checkDict[String(this.state.myEventsSource[i].event_id)] = true;
                console.log(this.state.myEventsSource[i].event_id);
            }
            for(let i=0;i<this.state.dataSource.length;++i){
                if(!(String(this.state.dataSource[i].event_id) in checkDict)){
                checkDict[String(this.state.dataSource[i].event_id)] = false;
                console.log(this.state.dataSource[i].event_id);
                }
            }
            // for(let obj in this.state.dataSource){
            //     if(!(String(obj.event_id) in checkDict)){
            //         checkDict[String(obj.event_id)] = false;
            //         console.log(obj.event_id);
            //     }
            // }
            this.setState({
                Dict: checkDict,
            })
        })
    }
    // checkBoxCondition(evt_id){
    //     for(var obj in checkArray){
    //         if(evt_id == obj.event_id){
    //             return(obj.isChecked);
    //         }
    //     }
    // }
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
        }).then()
    .catch((error) => {
        console.error(error);
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
    _handleCheckBoxEvent(event_id){
        checkDict[String(event_id)] = !(checkDict[String(event_id)]);
        this.setState({
            Dict:checkDict,
        });
        if(this.state.Dict[String(event_id)]){
            this.CallMyEventsApi(event_id);
        }
    }
    customRenderFunction(item){
        if(item.updated == true){
            return(
                <View elevation={10} style={styles.customitem}>
                    {/* <Modal animationType = {'slide'}
                        transparent = {false}
                        visible = {this.state.modalVisible}
                        onRequestClose={()=>{console.log('model has been closed')}}>
                        <TouchableHighlight onPress={()=>{this.toggleModal(!this.state.modalVisible)}}>    
                            <View style={styles.modal}>
                                <Text>
                                    Model is open!
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </Modal> */}
                    <View style={styles.touchableContainer}> 
                          
                          <View style={{flex:2}}>  
                            <View style={styles.heading}>
                           
                                <View style={styles.titleFlex} >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                                
                                
                                <View style={styles.checkBoxFlex}>
                                    <CheckBox
                                        center
                                        title=''
                                        // checkedIcon='dot-circle-o' can add images here
                                        // uncheckedIcon='circle-o'
                                        checkedIcon={<Image source={require('./checkboxicons/checked.png')}/>}
                                        uncheckedIcon={<Image source={require('./checkboxicons/unchecked.png')}/>}
                                        value = {this.state.Dict[String(item.event_id)]}
                                        //onchange function has to be changed
                                        onChange={()=>{checkDict[String(item.event_id)]=!checkDict[String(item.event_id)];
                                        this.setState({
                                            Dict:checkDict,
                                        });
                                        if(this.state.Dict[String(item.event_id)]){
                                            this.CallMyEventsApi(item.event_id);
                                        }}}
                                    />
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
                                //onPress={()=>this._handlePressButtonAsync(item.venue)}
                                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                                <View style={styles.innerFooter}>
                                    <Text style={{color:'white'}}>{item.venue_name}</Text>    
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.innerFooterInvisible}>
                            </View>    
                        </View>
                </View>
            )
        }
        else{
            return(
                <View elevation={10} style={styles.item}>
                    <Modal animationType = {'slide'}
                        transparent = {false}
                        visible = {this.state.modalVisible}
                        onRequestClose={()=>{console.log('model has been closed')}}>
                        <TouchableHighlight onPress={()=>{this.toggleModal(!this.state.modalVisible)}}>    
                            <View style={styles.modal}>
                                <Text>
                                    Model is open!
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </Modal>
                    <View style={styles.touchableContainer}> 
                      <TouchableHighlight onPress = {() => {this.toggleModal(true)}}>    
                          <View style={{flex:2}}>  
                            <View style={styles.heading}>
                                <View style={styles.titleFlex}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                                <View style={styles.checkBoxFlex}>
                                    <CheckBox
                                        center
                                        title=''
                                        // checkedIcon='dot-circle-o' can add images here
                                        // uncheckedIcon='circle-o'
                                        value = {this.state.Dict[String(item.event_id)]}
                                        checkedIcon={<Image source={require('./checkboxicons/checked.png')}/>}
                                        uncheckedIcon={<Image source={require('./checkboxicons/unchecked.png')}/>}
                                        //onchange function has to be changed
                                        //onChange={()=>{this.state._handleCheckBoxEvent(item.event_id)}}
                                        onChange={()=>{checkDict[String(item.event_id)]=!checkDict[String(item.event_id)];
                                            this.setState({
                                                Dict:checkDict,
                                            });
                                            if(this.state.Dict[String(item.event_id)]){
                                                this.CallMyEventsApi(item.event_id);
                                            }}}
                                    />
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
                                onPress = {()=>{Linking.openURL(String(item.venue_url))}}
                                //onPress={()=>this._handlePressButtonAsync(item.venue)}
                                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                                <View style={styles.innerFooter}>
                                    <Text style={{color:'white'}}>{item.venue_name}</Text>    
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.innerFooterInvisible}>
                            </View>    
                        </View>
                </View>
            )
        }
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
            // <View style={styles.boxcontainer}>
            //     <FlatList
            //     data = {this.state.dataSource}
            //     renderItem = {({item}) =>
            //     <ScrollView>
            //     <View style={styles.subContainerTotal}>
            //         <View style={styles.imageContainer}>
                        
            //         </View>
            //         <View style={styles.textContainer}>
            //             <View style={styles.heading}>
            //                 <Text>{item.day}</Text>
            //             </View>
            //             <View style={styles.text}>
            //                 <Text>{item.break1}</Text>
            //             </View>
            //         </View>
            //     </View>
            //     </ScrollView>}/>
            // </View>
                <FlatList 
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
export default ScreenOne;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical:20,
    },
    heading:{
        flex:1,
        marginTop:-10,
        marginLeft:10,
        flexDirection:'row',
    },
    itemInfoText:{
        marginLeft:10,
        marginBottom:10,
    },
    footer:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        marginLeft:5,
        marginRight:5,
        padding:5,
        borderRadius:30,
        borderWidth: 1,
        borderColor:'black',
        shadowOffset:{width: 0,  height: 3,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 5,
        overflow: 'hidden',
        
    },
    innerFooter:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        marginLeft:5,
        padding:5,
        borderRadius:25,
        borderWidth: 1,
        borderColor: 'rgb(93,173,226)',
        backgroundColor: 'rgb(93,173,226)',
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 1,
        elevation:4,
    },
    buttonContainer:{
        height:40,
        width:180,
        backgroundColor:'rgb(93,173,226)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    itemText:{
        color: 'black',
        fontWeight:'bold',
        fontSize: 20,
    },
    customitem:{
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'rgba(255,165,0,0.2)',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        shadowOffset:{width: 0,  height: 3,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 2,
    },
    item:{
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'white',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        shadowOffset:{width: 0,  height: 3,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 5,
    },
    buttonText:{
        color:'white',
        textAlign:'center',
    },
    modal:{
        flex:1,
        alignItems:'center',
        backgroundColor:'grey',
        padding:100,
    },
    touchableContainer:{
      flex:2,
    },
    titleFlex:{
        flex:5,
    },
    checkBoxFlex:{
        flex:0.5,
        marginRight: 3,
        marginTop: 1,
    },
    innerFooterInvisible:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
    },
});
