import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
class NetworkingEvents extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Text>NetworkingEvents</Text>
            </View>
        );
    }
}
export default NetworkingEvents;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});