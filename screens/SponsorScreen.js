import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class SponsorScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          email: '',
          esummit_id: '',
          user_name:'',
          user_id:'',
          email_err:'waiting to retrieve',
          itemId: '',
          name: '',
    
        };
      }
    _retrieveData = async () => {
        try {
          
          const user_name = await AsyncStorage.getItem('user_name');
        //   const user_id = await AsyncStorage.getItem('user_id');
        //   const email = await AsyncStorage.getItem('email');
        //   const esummit_id = await AsyncStorage.getItem('esummit_id');
          // let retrivedevents = JSON.parse(value);
          let user_name1 = JSON.parse(user_name);
        //   let user_id1 = JSON.parse(user_id);
        //   let email1 = JSON.parse(email);
        //   let esummit_id1 = JSON.parse(esummit_id);

        //   this.setState({user_name:user_name1});
          // this.setState({retrieved:retrivedevents[1].name});
          if (!(user_name == null)) {
            this.setState({user_name:user_name1});
        //   this.setState({myeventid:retrivedid});
          this.setState({email_err:"got the data!"});
          }
         } catch (error) {
           // Error retrieving data
           this.setState({email_err:"retrieving problem"});
         }
      }

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const name = navigation.getParam('name', 'some default value');
    
        return (
            <View style={styles.container}>
                <Text>SponsorScreeeen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>name: {JSON.stringify(name)}</Text>

                <Text>{this.state.user_name}</Text>
                <Text>{this.state.email_err}</Text>
                <Button
                title={'Retrieve data'}
                style={styles.input}
                onPress={this._retrieveData.bind(this)}
                />
            </View>
        );
    }
}
export default SponsorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});