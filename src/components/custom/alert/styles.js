'use strict';
let React = require('react-native');
import {Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import Constant from '../../utility/constant';

const buttonPrimary = Constant.BUTTON_COLOR;
const buttonSecondary = Constant.DISABLE_BUTTON_COLOR;
const background = Constant.BACKGROUND_COLOR;
const lightTextColor= Constant.LIGHT_TEXT_COLOR;
const darkBackground = Constant.DARK_BACKGROUND_COLOR;
const textColorPrimary ="#000";
const textColorSecondary ="#fff";

let styles = React.StyleSheet.create({
    flexBox: {
        flex: 1
    },
    addStoreButtonStyle: {
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.2,
        paddingVertical: 10,
        backgroundColor: '#3498db',
        flexDirection: 'row'
    },
    addStoreTextStyle: {
        color: '#fff',
        fontSize: 16,
        paddingLeft: 6,
        fontWeight: 'bold'
    },
    centerItems: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    splashLogo: {
        width: width / 1.5,
        height: width / 2.8
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: height * 0.4,
        paddingBottom: height * 0.4,
        paddingLeft: width * 0.45,
        paddingRight: width * 0.45,
        position: 'absolute',
        backgroundColor: 'transparent',
        opacity: 9,
    },
    modalContainerStyle: {
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: 'center'
    },
    modalTitleContainerStyle: {
        marginVertical:15
    },
    modalTitleTextStyle: {
        paddingLeft: 5,
        color: textColorPrimary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalMessageContainerStyle: {
        marginVertical:8,
        alignItems: 'center'
    },
    modalMessageTextStyle: {
        //paddingLeft: width * 0.05,
        paddingHorizontal: 12,
        color: textColorPrimary,
        fontSize: 16,
    },
    modalButtonStyle: {
        height: 40,
        borderRadius: 5,
        width: 100,
        backgroundColor: buttonPrimary,
        justifyContent: 'center',
        margin: 10
    },
    modalButtonTextStyle: {
        color: textColorSecondary,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rowContent:{
        flexDirection:'row'
    },
    image:{
        width: 70,
        height: 70
    }

});
module.exports = styles;
