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
    Modal
} from "react-native";
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

class ScreenTwo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            modalVisible:false,
            seed:1,
            refreshing:false,
        };
    }
    toggleModal(visible){
        this.setState({modalVisible:visible});
    }
    componentDidMount(){
        return fetch('http://esummit.ecell.in/v1/api/events/myevents/2')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                isLoading:false,
                dataSource: responseJson,
                refreshing: false},
                function(){

                });
        })
        .catch((error)=>{
            console.error(error)
            this.setState({
                refreshing:false
            });
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
                numColumns = {numColumns}
                refreshing = {this.state.refreshing}
                onRefresh = {this.handleRefresh}
                renderItem = {({item}) =>
                // if(item.empty === true){
                //     <View style = {[styles.item,styles.itemInvisible]}/>
                // }   
                <View style={styles.item}>
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
                                <Text style={styles.itemText}>{item.name}</Text>
                            </View>
                            <View style={styles.itemInfoText}>
                                <Text>{item.start_time}-{item.end_time}</Text>
                            </View>
                          </View>
                      </TouchableHighlight>
                    </View>    
                        <View style={styles.footer}>
                            <View style={styles.subFooter}>
                                <TouchableHighlight underlayColor="white">    
                                    <View style={styles.buttonContainer}>
                                        <Text style={styles.buttonText}>{item.venue}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View> 
                }/>
        );
    }
}
export default ScreenTwo;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginVertical:20,
    },
    heading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        width:Dimensions.get('window').width - 15,
        backgroundColor:'rgba(220,220,220,0.4)'
    },
    itemInfoText:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        height:10,
        paddingTop:10,
    },
    footer:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:5,
        marginRight:5,
    },
    subFooter:{
        flex:1,
        alignItems:'center'
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
        fontSize: 23,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5,
    },
    item:{
        backgroundColor: 'white',
        justifyContent:'center',
        flex:1,
        margin:1,
        height: 200,
        alignItems: 'center',
        flexDirection: 'column',
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

    }
});
