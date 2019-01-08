import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
class HomeScreen extends Component {

//    static navigationOptions = {
//     drawerLabel: 'Home',
//    drawerIcon : ({tintColor}) => (
//     <Image 
//         source={require('../assets/images/robot-prod.png')}
//         style={{height:24, width:24, tintColor: tintColor}}
//     />
//   )
//    }
    render() {
        return (
            <View style={styles.container}>
                <Text>HomeScreen</Text>
            </View>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});