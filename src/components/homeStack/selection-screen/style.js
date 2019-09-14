import { Platform, StyleSheet } from 'react-native';
import { Fonts, Constants, strings } from '../../../utils'


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListTouch: {
        borderRadius: 5, overflow: "hidden",
        elevation: 0.5,
        margin: 2,
        flexDirection: 'row',
    },
    rowCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 5,
        width: '40%'
    },
    viewInput: {
        paddingTop: 5,
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 22
    },
    iconLeft: {
        height: 25,
        width: 25,
        margin: 5
    },
    inputLayout: {
        width: '80%',
        marginHorizontal: 10
    },

    textInput: {
        fontSize: 16,
        height: 40,
        width: '80%',
        fontFamily: Fonts.Regular,
        color: Constants.color.black
    },
    textAreaContainer: {
        borderColor: Constants.color.primary,
        borderWidth: 1,
        borderRadius:5,
        padding:5
    },
    textArea: {
        textAlignVertical: 'top',
    },
     touchLogin: {
        backgroundColor: Constants.color.primary,
        justifyContent: "center",
        alignItems: "center",
        padding:10,
        margin:35,
        marginTop:0,
        borderRadius: 5
    },
    textButtonLogin: {
        color: Constants.color.white,
        fontSize: 16,
    },


})