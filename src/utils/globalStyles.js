import { StyleSheet, Platform } from 'react-native';
import { Constants, Fonts } from '.'


export const GlobalStyle = StyleSheet.create({
    defaultHeaderStyle: {
        backgroundColor: Constants.color.primary,
        paddingTop: 0,
    },
    defaultHeaderTitleStyle: {
        color: 'white',
        fontFamily: Fonts.Regular,
        fontSize: Platform.OS === 'android' ? Constants.fontSize.NormalX : Constants.fontSize.NormalXXX,
        fontWeight: '200',
    },
    activityIndicatorView: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom: '15%'
    },
    activityIndicatorWrapper: {
        // position:'absolute',
        // top:'35%',
        // left:'38%',
        backgroundColor: Constants.color.gray,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    toolbar: {
        height: (Platform.OS === Constants.PLATFORM.ios) ? Constants.TOOLBAR_HEIGHT.ios : Constants.TOOLBAR_HEIGHT.android,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Constants.color.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation:3,
        shadowRadius: 0,
    },
    defaultSafeAreaStyle:{
        backgroundColor:Constants.color.primary
    },
    toolbarWithNoMenu: {
        height: (Platform.OS === Constants.PLATFORM.ios) ? Constants.TOOLBAR_HEIGHT.ios : Constants.TOOLBAR_HEIGHT.android,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Constants.color.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation:3,
        shadowRadius: 0,
    },
    toolbarWithNoMenuText: {
        fontSize: Constants.fontSize.NormalXX,
        color: Constants.color.white,
        marginLeft: 15,
    },
    horizontalDivider:{
        width: '100%', 
        height: 1, 
        backgroundColor: Constants.color.seperator_color_single_food
    },
    titleTextStyle:{
            fontSize: 16,
            fontWeight:'900',
            color:Constants.color.white,
    }

})