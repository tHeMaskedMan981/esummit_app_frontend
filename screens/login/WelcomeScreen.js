import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage  } from 'react-native';
import GradientButton from "react-native-gradient-buttons";


export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: null,
      esummit_id: null,
      email_err:'',
      user_name:null,
      user_id:null,
      get_username:null,
      get_email:null,
      get_esummitid:null,
      get_userid:null,
    };
  }

//   _storeData = async () => {

//   try {
//     await AsyncStorage.setItem('user_id',JSON.stringify(this.state.user_id));
//     await AsyncStorage.setItem('user_name',JSON.stringify(this.state.user_name));
//     await AsyncStorage.setItem('email',JSON.stringify(this.state.email));
//     await AsyncStorage.setItem('esummit_id',JSON.stringify(this.state.esummit_id));

//   } catch (error) {
//       this.setState({email_err:"problem with storage"});
//   }
// }
_storeData = async (key, value) => {

    try {
      await AsyncStorage.setItem(key,value);

    } catch (error) {
        this.setState({email_err:"problem with storage"});
    }
  }
_retrieveData = async () => {
    try {
      
      const user_name = await AsyncStorage.getItem('user_name');
      const user_id = await AsyncStorage.getItem('user_id');
      const email = await AsyncStorage.getItem('email');
      const esummit_id = await AsyncStorage.getItem('esummit_id');
      // let retrivedevents = JSON.parse(value);
      let user_name1 = JSON.parse(user_name);
      let user_id1 = JSON.parse(user_id);
      let email1 = JSON.parse(email);
      let esummit_id1 = JSON.parse(esummit_id);

      if (!(user_name == null)) {
        this.setState({get_username:user_name1});
        this.setState({get_email:email1});
        this.setState({get_esummitid:esummit_id1});
        this.setState({get_userid:user_id1});
      }
     } catch (error) {
       // Error retrieving data
       this.setState({email_err:"retrieving problem"});
     }
  }

  onLogin() {

    const  email = this.state.email;
    const  esummit_id  = this.state.esummit_id;

    // Alert.alert('Credentials', `${email} ${esummit_id}`);
    this.setState({status:'submitted'});
  
    // return fetch('https://www.ecell.in/esummit/get_user_data.php/?email=17ies021@smvdu.ac.in&esummit_id=ESS69132')
    return fetch('http://esummit.ecell.in/v1/user/register/', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        esummit_id: esummit_id,
        email: email,
    }),
    // body: JSON.stringify({
    //     esummit_id: 'ESS69132',
    //     email: '17ies021@smvdu.ac.in',
    // }),
    })
    .then((response) => response.json())
    .then((responseJson) => {

    try
      {
        this.setState({
            user_name: responseJson.profile.user_name,
            user_id: responseJson.profile.user_id,
            email: responseJson.profile.email,
            esummit_id: responseJson.profile.esummit_id,
        });
    //   this._storeData(); 
    this._storeData('user_id',JSON.stringify(this.state.user_id)); 
    this._storeData('user_name',JSON.stringify(this.state.user_name)); 
    this._storeData('email',JSON.stringify(this.state.email)); 
    this._storeData('esummit_id',JSON.stringify(this.state.esummit_id)); 
    
    this.props.navigation.navigate('DrawerNavigator', {
        user_id: this.state.user_id,
        user_name: this.state.user_name,
        esummit_id:this.state.esummit_id,
        email:this.state.email,
      });

      }
      catch (error) {
        Alert.alert('Credentials', "The entered email or E-Summit ID is not correct. Please verify the details.");
      }
      
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
      
        {/* <Text> {this.state.user_name} </Text>
        <Text> {this.state.user_id} </Text>
        <Text> {this.state.esummit_id}</Text>
        <Text> {this.state.retrieved}</Text>
        <Text> Stored Data :</Text>
        <Text> {this.state.get_username} </Text>
        <Text> {this.state.get_esummitid} </Text>
        <Text> {this.state.get_email}</Text>
        <Text> {this.state.get_userid}</Text> */}
  
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
        <View style={styles.err} >
        <Text> {this.state.email_err} </Text>
      </View>

        <TextInput
          value={this.state.esummit_id}
          onChangeText={(esummit_id) => this.setState({ esummit_id })}
          placeholder={'esummit_id'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <GradientButton
          style= {styles.binput1}
          textStyle={{ fontSize: 24 }}
          text="SIGN UP"
          height={60}
          gradientBegin="#e1306c"
          gradientEnd="#275d8e"
          impact
          onPress={this.onLogin.bind(this)}
        />
        <View style={styles.or}>
          <Text style={{fontSize:24}}>OR</Text>
        </View>
        
        <GradientButton
          text="Continue as Guest"
          style={styles.binput}
          textStyle={{ fontSize: 24 }}
          height={60}
          gradientBegin="#e1306c"
          gradientEnd="#275d8e"
          impact
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('DrawerNavigator', {
              user_id: this.state.user_id,
              user_name: this.state.user_name,
              esummit_id:this.state.esummit_id,
              email:this.state.email,
            });
          }}
        />
        <View style={{flexDirection:'row'}}>
        <View>
          <Text>
            Try 
          </Text>
          </View>
          <View>
          <Button title='Google Sign In'
           style={{backgroundColor: '#000' , paddingBottom:0, paddingLeft:0,
           paddingRight:0, paddingTop:0, borderWidth:0,
           }} />
          </View>
        </View>
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
    width: 350,
    height: 65,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginTop:0,
    // marginBottom: 15,
    borderRadius: 30,
    fontSize: 30,
  },
  binput: {
  
  width: 300,
  paddingBottom: 0,
  
  },
  binput1: {
    marginTop:15,
    width: 300,
    paddingBottom: 0,
    
    },
  err: {
    marginBottom: 20,
  },
  or:{
  }
});
