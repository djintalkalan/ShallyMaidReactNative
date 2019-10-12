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
        borderWidth:0.5,
        borderColor:'#808080',
        flexDirection: 'row',
    },
    touchLogin: {
        backgroundColor: Constants.color.primary,
        justifyContent: "center",
        alignItems: "center",
        padding:15,
        margin:35,
        marginTop:15,
        borderRadius: 5
    },
    textButtonLogin: {
        color: Constants.color.white,
        fontSize: 16,
    },

    mainCard: {
        borderColor: Constants.color.white,
        borderBottomColor: Constants.color.gray,
        borderWidth: 1.5,
        padding: 2
    },
    viewImg: {
        width: '30%',
        height: 100,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    imgLogo: {
        width: '100%',
        height:'100%'
    },
    viewItems: {
        width: '70%',
        padding: 5,
    },
    viewInputRow: {
        flexDirection: 'row', 
        width: '100%'
    },

    textItemName: {
        color: Constants.color.black,
        marginTop: 3,
        marginBottom: 10,
        fontSize: 16,
    },
    textItems: {
        width: '100%',
        fontSize: 14,
        color:Constants.color.drakgray
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
        fontSize: 14,
    },
    

})