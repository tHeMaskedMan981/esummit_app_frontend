import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage, Image , ToastAndroid } from 'react-native';
import GradientButton from 'react-native-gradient-buttons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import background from '../../assets/images/Compi.png';
import styles from '../styles';

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
      islogin:'false',
      user_email: null,
      user_esummit_id: null,
      user_user_name:null,  
      user_user_id:null,
      data:0,
      user_islogin:'false',
    };
    this.storeData = this.storeData.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
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
// _storeData = async (key, value) => {

//     try {
//       await AsyncStorage.setItem(key,value);
//       ToastAndroid.showWithGravityAndOffset(
//         "stored"+key,
//         ToastAndroid.SHORT,
//         ToastAndroid.TOP,
//         0,
//         40);
//     } catch (error) {
//         this.setState({email_err:"problem with storage"});
        
//     }
//   }
storeData(){
  let name = this.state.user_name;
  let email = this.state.email;
  let esummitid = this.state.esummit_id;
  let userid = this.state.user_id;
  let islogin = this.state.islogin;
  AsyncStorage.setItem('name',name);
  AsyncStorage.setItem('email',email);
  AsyncStorage.setItem('esummitid',esummitid);
  AsyncStorage.setItem('userid',userid);
  AsyncStorage.setItem('islogin',islogin);
  this.setState({
    user_name:name,
    email:email,
    esummit_id:esummitid,
    user_id:userid,
    islogin:islogin,
  })
}
// _retrieveData = async (key) => {
//     try {
      
//       // const user_name = await AsyncStorage.getItem('user_name');
//       // const user_id = await AsyncStorage.getItem('user_id');
//       // const email = await AsyncStorage.getItem('email');
//       // const esummit_id = await AsyncStorage.getItem('esummit_id');
//       // const is_login = await AsyncStorage.getItem('is_login');
//       // // let retrivedevents = JSON.parse(value);
//       // let user_name1 = JSON.parse(user_name);
//       // let user_id1 = JSON.parse(user_id);
//       // let email1 = JSON.parse(email);
//       // let esummit_id1 = JSON.parse(esummit_id);
//       // let is_login1 = JSON.parse(is_login);

//       // if (!(user_name == null)) {
//       //   this.setState({get_username:user_name1});
//       //   this.setState({get_email:email1});
//       //   this.setState({get_esummitid:esummit_id1});
//       //   this.setState({get_userid:user_id1});
//       //   this.setState({islogin:is_login1});
//       // }
//       value = await AsyncStorage.getItem(key);
//       value = JSON.parse(value);
//       if(!(value==null)){
//         this.setState({
//           key:value,
//         }); 

//         console.log(key+":"+JSON.stringify(this.state.key));
//       }
//       // this.setState({
//       //   key:value,
//       // });
//       ToastAndroid.showWithGravityAndOffset(
//         "retrieved:"+key+":"+value,
//         ToastAndroid.SHORT,
//         ToastAndroid.TOP,
//         0,
//         40);
//      } catch (error) {
//        // Error retrieving data
//        this.setState({email_err:"retrieving problem"});
//      }
//   }
  retrieveData(){
    AsyncStorage.getItem('islogin').then((islogin)=>{
      this.setState({
        islogin:islogin,
        user_islogin:islogin,
      })
    })
    AsyncStorage.getItem('name').then((name)=>{
      this.setState({
        user_name:name,
        user_user_name:name,
      })
    })
    AsyncStorage.getItem('email').then((email)=>{
      this.setState({
        email:email,
        user_email:email,
      })
    })
    AsyncStorage.getItem('esummitid').then((esummitid)=>{
      this.setState({
        esummit_id:esummitid,
        user_esummit_id:esummitid,
      })
    })
    AsyncStorage.getItem('userid').then((userid)=>{
      this.setState({
        user_id:userid,
        user_user_id:userid,
      })
    })
    // AsyncStorage.getItem('islogin').then((islogin)=>{
    //   this.setState({
    //     islogin:islogin,
    //     user_islogin:islogin,
    //   })
    // })
  }
  onLogin() {

    const  email = this.state.email;
    const  esummit_id  = this.state.esummit_id;

    // Alert.alert('Credentials', `${email} ${esummit_id}`);
    // this.setState({status:'submitted'});
  
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
            islogin:'true'
        });
    //   this._storeData(); 
    // this._storeData('user_user_id',JSON.stringify(this.state.user_id)); 
    // this._storeData('user_user_name',JSON.stringify(this.state.user_name)); 
    // this._storeData('user_email',JSON.stringify(this.state.email)); 
    // this._storeData('user_esummit_id',JSON.stringify(this.state.esummit_id));
    // this._storeData('user_islogin',this.state.islogin); 
    this.storeData() ;
    
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
  async onGoogleLogin() {
    console.log("called GoogleLogin")
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "402561594320-eeuu2tnpqdouc96dcgjtkf124q5bgtet.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })
  
      if (result.type === "success") {
        
        /*
        1. Call api to create user object using result object 
        2. Navigate to drawerNavigation after creating user object
        */
        value = fetch('http://esummit.ecell.in/v1/user/register/google/', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: result.user.name,
            email: result.user.email,
            photo_url: result.user.photoUrl,
          }),
        }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            user_name:responseJson.profile.user_name,
        });
  
          try
            {
              this.setState({
                  user_name: responseJson.profile.user_name,
                  user_id: responseJson.profile.user_id,
                  email: responseJson.profile.email,
                  // photo_url: responseJson.profile.photo_url,
                  islogin:'true',
              });
          //   this._storeData(); 
          // this._storeData('user_name',responseJson.profile.user_name); 
          // this._storeData('user_user_id',JSON.stringify(this.state.user_id)); 
          // this._storeData('user_user_name',JSON.stringify(this.state.user_name)); 
          // this._storeData('user_email',JSON.stringify(this.state.email)); 
          // this._storeData('user_photo_url',JSON.stringify(this.state.photo_url)); 
          // this._storeData('user_esummit_id',JSON.stringify("")); 
          // this._storeData('user_islogin',this.state.islogin);  
          this.storeData();
          
          this.props.navigation.navigate('DrawerNavigator', {
              user_id: this.state.user_id,
              user_name: this.state.user_name,
              // photo_url:this.state.photo_url,
              email:this.state.email,
            });
      
            }
            catch (error) {
              Alert.alert('Credentials', "The entered email or E-Summit ID is not correct. Please verify the details.");
            }
            
          })
        .catch((error) => {
          console.error(error);
        });
        //console.log(responseJson);
       
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  navigate(){
    
    this.props.navigation.navigate('DrawerNavigator', {
      user_id: this.state.user_id,
      user_name: this.state.user_name,
      esummit_id:this.state.esummit_id,
      email:this.state.email,
    });
  
  }
  componentDidMount(){
  //   this.setState({
  //     user_name:"Guest",
  // });
    console.log("inside component");
    // console.log("inside component did mount with data value as " + this.state.data);
    this.retrieveData();
    
    // this._retrieveData('user_user_name');
    // this._retrieveData('user_user_id');
    // this._retrieveData('user_esummit_id');
    // this._retrieveData('user_email');
    // this._retrieveData('user_islogin');
      
    // let a = this.state.user_user_name
    // this.setState({
    //   user_name:a,
    //   user_id:this.state.user_user_id,
    //   email:this.state.user_email,
    //   esummit_id:this.state.user_esummit_id,
    //   islogin:this.state.user_islogin,
    // });
    // console.log(this.state.user_user_name);
    // console.log(this.state.user_user_id);
    // console.log(this.state.user_email);
    // console.log(this.state.user_esummit_id);
    // console.log(this.state.user_name);
    // console.log(this.state.user_id);
    // console.log(this.state.email);
    // console.log(this.state.esummit_id);

    // this.state.islogin=='true'? this.navigate(): null
    // {this.state.islogin=='true'? this.navigate(): null}
  }
  render() {
    // let count = this.state.data;
    // count = count +1;
    // console.log("inside render with data value as " + this.state.data);
    
    // {this.state.islogin=='true'? this.navigate(): null}
    // console.log("inside render");
    // console.log(this.state.islogin);
    // {this.state.islogin=='true'? this.navigate(): null}
    // console.log(this.state.user_user_name);
    // console.log(this.state.user_user_id);
    // console.log(this.state.user_email);
    // console.log(this.state.user_esummit_id);
    // console.log(this.state.user_name);
    // console.log(this.state.user_id);
    // console.log(this.state.email);
    // console.log(this.state.esummit_id);
    
    return (
      <View style={styles.welcome_container}>
        
        <View style={styles.background}>
        <Image style={{height:200,width:200,marginTop:5,marginLeft:2}}
         source={background}/>
                                      
        </View>
        <View style={styles.inputs}>
        <TextInput
          value={this.state.email}
          onChangeText={ (email) => {
              this.setState({ email });
              if (email.search('@')>=0) this.setState({ email_err:"" });
              else this.setState({ email_err:"Enter a valid E-Mail Address" }); 
              }}
          placeholder={'Email'}
          style={styles.input}
        />
        {/* <View style={styles.err} >
        <Text> hi{this.state.user_name} </Text>
        <Text>hi,{this.state.email}</Text>
        {console.log(this.state.islogin)}
        <Text>hi,{this.state.islogin}</Text>
        {console.log(this.state.islogin)}
      </View> */}

        <TextInput
          value={this.state.esummit_id}
          onChangeText={(esummit_id) => this.setState({ esummit_id })}
          placeholder={'Esummit_id'}
          secureTextEntry={true}
          style={styles.input}
        />
        </View>
        <View style={styles.buttons}>
        <GradientButton
          style= {styles.binput1}
          textStyle={{ fontSize: 24 }}
          text="Sign In"
          height={40}
          gradientBegin="#6673a4"
           gradientEnd="#6673a4"
          impact='True'
          impactStyle = 'Light'
          onPressAction={this.onLogin.bind(this)}
        />

          <GradientButton text='Google Sign In'
           textStyle={{ fontSize: 24 }}
           height={40}
           style={styles.binput}
           gradientBegin="#6673a4"
           gradientEnd="#6673a4"
          //  impact='True'
          //  impactStyle = 'Light'
           onPressAction={this.onGoogleLogin.bind(this)} 
           />
          <GradientButton
          text="Continue as Guest"
          style={styles.binput}
          textStyle={{ fontSize: 24 }}
          height={40}
          gradientBegin="#6673a4"
           gradientEnd="#6673a4"
          // impact='True'
          impactStyle = 'Light'
          onPressAction={() => {
            console.log("Pressed");
            this.setState({
              // data:count,
          });
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('DrawerNavigator', {
              user_id: this.state.user_id,
              user_name: this.state.user_name,
              esummit_id:this.state.esummit_id,
              email:this.state.email,
            });
          }}
        />
           
           </View>
           {/* </LinearGradient> */}
          {/* </View>
        </View> */}
        {/* {this.state.islogin=='true'? this.navigate(): null} */}
      </View>
    );
  }
}

