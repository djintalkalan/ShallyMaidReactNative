import { Platform, StyleSheet } from 'react-native';
import { Fonts, Constants, strings } from '../../../utils'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
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
    touchLogin: {
        backgroundColor: Constants.color.primary,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        margin: 35,
        marginTop: 15,
        borderRadius: 5
    },
    textButtonLogin: {
        color: Constants.color.white,
        fontSize: 16,
    },

    mainCard: {
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 8
    },
    viewImg: {
        width: '30%',
        height: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    imgLogo: {
        width: '100%',
        height: '100%'
    },
    viewItems: {
        width: '100%',
        padding: 5,
    },
    viewInputRow: {
        flexDirection: 'row',
        width: '100%'
    },
    textItemName: {
        color: Constants.color.black,
        fontSize: 11,
        width: '45%'
    },

    textItemValue: {
        color: "#808080",
        fontSize: 10,
        width: '55%'
    },
    textItems: {
        width: '100%',
        fontSize: 14,
        color: Constants.color.drakgray
    },

    buttonStatus: {
        marginHorizontal: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Constants.color.primary,
    },
    textAmountProcessing: {
        color: Constants.color.primary,
        fontSize: 10,
        width: '55%'
    },
    imageThumbnail: {
        width: 50,
        height: 50,

    },


})