import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { Constants, WebBrowser } from 'expo';
class ScreenOne extends Component {

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.google.com/maps/place/Convocation+Hall/@19.13503,72.9086539,16z/data=!4m5!3m4!1s0x3be7c7f65973de09:0xca6e6ea532d81caf!8m2!3d19.1319555!4d72.9143552');
        this.setState({ result });
      };


    render() {
        return (
            <View style={styles.container}>
                {/* <Button title="Log out" onPress={() => this.props.screenProps.navigation.navigate('Map')} /> */}
                <Button title="Convocation Hall" onPress={this._handlePressButtonAsync} />
            <Text> The name is :  {this.props.screenProps.user_name} </Text>
            </View>
        );
    }
}
export default ScreenOne;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});