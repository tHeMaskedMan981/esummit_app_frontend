import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class HelplineScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>HelplineScreen </Text>
                <Text>the clan is {this.props.screenProps.clan}</Text>
            </View>
        );
    }
}
export default HelplineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});