import { Platform, StyleSheet } from 'react-native';
import { Fonts, Constants, strings } from '../../../utils'


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListTouch: {
        borderRadius: 5, overflow: "hidden",
        elevation: 1,
        margin: 2,
        flexDirection: 'row',
    },
    subcatItemTouch:{
        overflow: "hidden",
        elevation: 0.5,
        margin: 5,
        flexDirection: 'row',
    }

    

})