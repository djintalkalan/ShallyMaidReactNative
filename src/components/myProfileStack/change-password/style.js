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
    

})