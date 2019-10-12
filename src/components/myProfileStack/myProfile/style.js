import { Platform, StyleSheet } from 'react-native';
import { Fonts, Constants, strings } from '../../../utils'


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListTouch: {
        borderRadius: 5,
        overflow: "hidden",
        elevation: 0.5,
        margin: 2,
        borderWidth: 0.5,
        borderColor: '#808080',
        flexDirection: 'row',
    },
    myProfileListView: {
        flexDirection: 'row',

    },
    profileItem: {
        alignItems: 'center',
        justifyContent:'center',
        width: '33%',    
        paddingVertical:7
    },
    inputIcon: {
        height: 18,
        width: 18,
        marginTop: 5,
        marginRight: 5,
        alignItems: 'center',
        paddingRight: 5
    },
    textProfileItem: {
        fontSize: 10,
        marginVertical:10,
        color: 'black',
        
        alignSelf: 'center',
        textAlign: 'center'

    },
    verticalLine:{
        height:"100%",
        backgroundColor:'#bfbfbf',
        width:0.8
    },
    touchLogin: {
        backgroundColor: Constants.color.primary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        width:160,
        borderRadius: 50
    },
    
    textButtonLogin: {
        color: Constants.color.white,
        fontSize: 14,
        paddingVertical:10,
    }


})