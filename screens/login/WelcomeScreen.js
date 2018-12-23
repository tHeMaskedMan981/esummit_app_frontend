import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class WelcomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.container}>
            <Button  title="Log in" onPress={() => this.props.navigation.navigate('LoginScreen')} />
                
            </View>
            <View style={styles.container}>
            <Button  title="Sign Up yoyo" onPress={() => this.props.navigation.navigate('SignUpScreen')} />
            
            </View>
            <View style={styles.container}>
            <Button  title="Continue as Guest" onPress={() => this.props.navigation.navigate('DrawerNavigator')} />

            </View>

               </View>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons:{
        margin:20,
        padding:10
    }
});