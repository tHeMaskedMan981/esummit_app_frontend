import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex:1,
        marginVertical:20,
    },
    heading:{
        flex:1,
        marginTop:-10,
        marginLeft:10,
        flexDirection:'row',
    },
    itemInfoText:{
        marginLeft:10,
        marginBottom:10,
        fontFamily:'latoRegular',
        color: "#221d3d",
    },
    footer:{
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        marginLeft:5,
        marginRight:5,
        padding:5,
        borderRadius:30,
        borderWidth: 1,
        borderColor:'#6674a3',
        shadowOffset:{width: 0,  height: 3,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#6674a3',
        
    },
    innerFooter:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        marginLeft:5,
        padding:5,
        borderRadius:25,
        borderWidth: 1,
        borderColor: '#93a0cc',
        backgroundColor: '#93a0cc',
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 1,
        elevation:4,
    },
    buttonContainer:{
        height:40,
        width:180,
        backgroundColor:'rgb(93,173,226)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    itemText:{
        fontWeight:'bold',
        fontSize: 20,
        fontFamily:'latoRegular',
        color: "#221d3d",
    },
    customitem:{
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'rgba(255,165,0,0.2)',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        shadowOffset:{width: 0,  height: 3,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 2,
    },
    item:{
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:15,
        marginRight:15,
        backgroundColor:'white',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        shadowOffset:{width: 0,  height: 3,},
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 5,
    },
    buttonText:{
        color:'white',
        textAlign:'center',
    },
    modal:{
        flex:1,
        alignItems:'center',
        backgroundColor:'grey',
        padding:100,
    },
    touchableContainer:{
      flex:2,
    },
    titleFlex:{
        flex:5,
    },
    checkBoxFlex:{
        flex:0.55,
        marginTop: 1,
    },
    innerFooterInvisible:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
    },
    screen:{
        position:'absolute',
        flex:1,
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(68, 69, 71, 0.5)',
        justifyContent: 'center',
        alignItems:'center'
        
    },
    screen_image:{
        // flex:1,
        justifyContent:'center',
        width:'100%',
        height:'40%',

    },
    image:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain',
    },
    screen_box:{
        width:'80%',
        padding:10,
        backgroundColor:'white',
        borderRadius:10,
        
    },
    screen_name:{
       fontSize:24,
    },
    screen_desc:{
        width:'100%',
        // height:'40%',
        textAlign:'left',
        
    },
    vbutn:{
        width:'100%',
        height:65,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:10,
    },
    vcross:{
        // height:'10%',
        flexDirection:'row-reverse',
        textAlign:'right',
        width:'100%'
    },
    onCheckBox:{
        borderColor:'rgba(93,173,226,1)',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: 'rgba(93,173,226,0.45)',
        height:30,
        width:30,
        marginRight:10,
    },
    offCheckBox:{
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor:'rgba(120,120,120,0.15)',
        height: 30,
        width: 30,
        marginRight:10,

    }
});