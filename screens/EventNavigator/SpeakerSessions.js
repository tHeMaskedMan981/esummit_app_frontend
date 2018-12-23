import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
class SpeakerSessions extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>SpeakerSessions</Text>
            </View>
        );
    }
}
export default SpeakerSessions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});