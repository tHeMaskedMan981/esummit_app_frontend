import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage, Image, Animated  } from 'react-native';
import GradientButton from 'react-native-gradient-buttons'

export default class LoadingGIF extends Component{
    constructor(props){
        super(props);
        this.fadevalue = new Animated.Value(1)
    }
    _fadeanimation(){
        this.fadevalue.setValue(1);
        Animated.sequence([
            Animated.timing(this.fadevalue,{
                toValue:0,
                duration:500,
            }),
            Animated.timing(this.fadevalue,{
                toValue:1,
                duration:500,
            })  
        ]).start(()=>this._fadeanimation());
    }
    screen(){
        return(
            
           <Animated.View >
            <Animated.Image 
            // source={require('../assets/images/index.png')} 
            source={{uri: 'https://cdn.dribbble.com/users/69182/screenshots/2151363/animated_loading__by__amiri.gif'}}  
            style={[styles.ecell,{opacity:this.fadevalue}]}
            />
            
            </Animated.View>
            
        );
    }
    componentDidMount(){
        // this._fadeanimation();
    }
    render(){
        console.log(this.props.show);
        return(
            // <View style={{ 
            //     flex:1,
            // position:'absolute',
            // display: (this.props.show) ? "flex" : "none" ,
            // backgroundColor:'white',
            // justifyContent:'center',
            // alignItems:'center',
            //  }}>
            // <Text>Loading {this.props.show}</Text>
            // </View>
            <View style={{flex:1, position:'absolute',justifyContent:'center',alignItems:'center',
            height:'100%',
        width:'100%',backgroundColor:'white',
            }}>
            {this.props.show == 1? this.screen(): null }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    show:{
        flex:1,
        position:'absolute',
        // display: (this.props.show) ?'block' : 'none' ,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    ecell:{
        height:350,
        width:350,
    }
})