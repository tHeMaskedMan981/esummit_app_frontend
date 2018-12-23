import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class ScreenTwo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ScreenTwo this is awesome</Text>
            </View>
        );
    }
}
export default ScreenTwo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});