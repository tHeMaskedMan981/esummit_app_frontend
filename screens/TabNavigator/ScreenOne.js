import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Dimensions
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

class ScreenOne extends Component {
    constructor(props){
        super(props);
        this.state = {isLoading:true}
    }
    componentDidMount(){
        return fetch('http://esummit.ecell.in/v1/api/events')
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                isLoading:false,
                dataSource: responseJson},
                function(){

                });
        })
        .catch((error)=>{
            console.error(error)
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
                renderItem = {({item}) =>
                // if(item.empty === true){
                //     <View style = {[styles.item,styles.itemInvisible]}/>
                // }
                <View style={styles.item}>
                    <View style={styles.heading}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                    <View style={styles.itemInfoText}>
                        <Text>{item.description}</Text>
                        <Text>{item.start_time}-{item.end_time}</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.subFooter}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>GET LOCATION</Text>
                            </View>
                        </View>
                        <View style={styles.subFooter}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>ADD TO MY EVENTS</Text>
                            </View>
                        </View>
                    </View>
                </View>
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
        justifyContent:'center',
        alignItems:'center',
        width:500,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        backgroundColor:'rgba(220,220,220,0.4)'
    },
    itemInfoText:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
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
    itemInvisible:{
        backgroundColor:'transparent',
    },
    item:{
        backgroundColor: 'white',
        justifyContent:'center',
        flex:1,
        margin:1,
        height: 250,
        alignItems: 'center',
        flexDirection: 'column',
    },
    buttonText:{
        color:'white',
        textAlign:'center',
    }
});
