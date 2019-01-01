import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Constants, WebBrowser } from 'expo';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import HelplineScreen from './HelplineScreen';

export default class HelplineScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <View style={{ padding: 10 }}>
                    <Ionicons name="md-menu" size={44} onPress={() => navigation.openDrawer()} />
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>HelplineScreen </Text>
                <Text>the clan is {this.props.screenProps.clan}</Text>
            </View>
        );
    }
}
// export default HelplineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

