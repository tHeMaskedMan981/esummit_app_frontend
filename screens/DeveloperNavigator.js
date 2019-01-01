import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import DeveloperScreen from './DeveloperScreen'

class DeveloperScreen extends Component {

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