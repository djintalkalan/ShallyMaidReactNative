import { Platform, StyleSheet } from 'react-native';
import { Fonts, Constants, strings } from '../../../utils'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    flatListTouch: {
        borderRadius: 10, overflow: "hidden",
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15
    },
    textTitle: {
        fontSize: 20,
        color: Constants.color.white,
        marginLeft: 15,
    },
    loginForm: {
        padding: 30,
        width: '100%',
        flex: 8
    },

    imgBack: {
        width: '100%',
        height: '100%'
    },
    touchOpacity: {
        backgroundColor: Constants.color.primary,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        padding: 15,
        marginTop: 20,
        borderRadius: 5
    },
    textButtonAdd: {
        color: Constants.color.white

    },
    viewText: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: "center"
    },
    textConfirmation: {
        fontSize: 15,
        marginTop: 15,
        textAlign: 'center',
        color: Constants.color.black
    },
    textLine: {
        fontSize: 17,
        color: Constants.color.black
    },
    textData: {
        fontSize: 18,
        marginLeft: 5,
        color: Constants.color.star_color
    },
    textContact: {
        textAlign: "center",
        fontSize: 11,
        marginVertical: 15,
        color: Constants.color.black
    },
    viewEmailRow: {
        flexDirection: "row",
        margin: 2,
        alignItems: "center"
    },
    iconLeft: {
        height: 25,
        width: 25,
        padding: 5
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: Constants.color.primary
    },




})


