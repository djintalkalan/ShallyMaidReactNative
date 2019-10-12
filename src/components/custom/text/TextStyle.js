import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native';
import { Fonts } from '../../../utils/fonts'

export const TextBold = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular,fontWeight: '500'}, props.textStyle]}>{props.title}</Text>
    );
}

export const TextRegular = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular,color:"#626262",letterSpacing:0.9}, props.textStyle]}>{props.title}</Text>
    );
}

export const TextLite = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular,fontWeight:'100',letterSpacing:0.9,color:"#626262"}, props.textStyle]}>{props.title}</Text>
    );
}
export const TextItalic = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular,fontStyle:'italic',letterSpacing:0.9,color:"#626262"}, props.textStyle]}>{props.title}</Text>
    );
}
export const TextLightItalic = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily:  Fonts.Regular,fontStyle:'italic',fontWeight:'100',letterSpacing:0.9,color:"#626262"}, props.textStyle]}>{props.title}</Text>
    );
}
export const TextBoldItalic = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular,fontStyle:'italic',fontWeight:'bold',letterSpacing:0.9,color:"#626262"}, props.textStyle]}>{props.title}</Text>
    );
}

export const TextHeading = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular,fontWeight:'bold',color:"#212121",letterSpacing:0.9}, props.textStyle]}>{props.title}</Text>
    );
}

