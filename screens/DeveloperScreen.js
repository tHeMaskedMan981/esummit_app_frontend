import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class DeveloperScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>DeveloperScreen</Text>
            </View>
        );
    }
}
export default DeveloperScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});