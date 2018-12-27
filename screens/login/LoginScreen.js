import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage  } from 'react-native';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      esummit_id: '',
      status:'not-submitted',
      email_err:'',
      id_err:'',
      myevents:"something",
      myeventid:1,
      retrieved:'nothing to show yet',
      profile:'',
      recieved:'false',
      user_name:'',
      user_id:'',

    };
  }
  
  _storeData = async () => {
  
  try {
    // await AsyncStorage.setItem('user_id',JSON.stringify(this.state.user_id));
    await AsyncStorage.setItem('user_name',JSON.stringify(this.state.user_name));
    // await AsyncStorage.setItem('email',JSON.stringify(this.state.email));
    // await AsyncStorage.setItem('esummit_id',JSON.stringify(this.state.esummit_id));

  } catch (error) {
      this.setState({email_err:"problem with storage"});
  }
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
        this.setState({retrieved:user_name1});
    //   this.setState({myeventid:retrivedid});
    //   this.setState({email_err:"retrieving inside function"});
      }
     } catch (error) {
       // Error retrieving data
       this.setState({email_err:"retrieving problem"});
     }
  }

  onLogin() {

    const  email = this.state.email;
    const  esummit_id  = this.state.esummit_id;

    Alert.alert('Credentials', `${email} ${esummit_id}`);
    this.setState({status:'submitted'});
  
    // return fetch('https://www.ecell.in/esummit/get_user_data.php/?email=17ies021@smvdu.ac.in&esummit_id=ESS69132')
    return fetch('http://esummit.ecell.in/v1/user/register/', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        esummit_id: 'ESS69132',
        email: '17ies021@smvdu.ac.in',
    }),
    })
    .then((response) => response.json())
    .then((responseJson) => {


      this.setState({
            user_name: responseJson.profile.user_name,
            user_id: responseJson.profile.user_id,
            email: responseJson.profile.email,
            esummit_id: responseJson.profile.esummit_id,
        });
      this._storeData();  
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
      <View>
        <Text> {this.state.user_name} </Text>
      </View>
      <View>
        <Text> {this.state.user_id} </Text>
      </View>
      <View>
        <Text> {this.state.esummit_id}</Text>
      </View>
      <View>
        <Text> {this.state.retrieved}</Text>
      </View>
        <TextInput
          value={this.state.email}
          onChangeText={ (email) => {
              this.setState({ email });
              if (email.search('@')>=0) this.setState({ email_err:"" });
              else this.setState({ email_err:"Enter a valid E-Mail Address" }); 
              }}
          placeholder={'email'}
          style={styles.input}
        />
        <View>
        <Text> {this.state.email_err} </Text>
      </View>

        <TextInput
          value={this.state.esummit_id}
          onChangeText={(esummit_id) => this.setState({ esummit_id })}
          placeholder={'esummit_id'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        <Button
          title={'Store Data'}
          style={styles.input}
          onPress={this._storeData.bind(this)}
        />
        <Button
          title={'Retrieve data'}
          style={styles.input}
          onPress={this._retrieveData.bind(this)}
        />
        <Button
          title={'go to sponsors'}
          style={styles.input}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('DrawerNavigator', {
              user_id: this.state.user_id,
              user_name: this.state.user_name,
            });
            console.log(this.state.user_id);
            console.log(this.state.user_name);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});