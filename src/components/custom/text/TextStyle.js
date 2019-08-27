import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native';
import { Fonts } from '../../../utils/fonts'

export const TextBold = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Bold}, props.textStyle]}>{props.title}</Text>
    );
}

export const TextRegular = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Regular}, props.textStyle]}>{props.title}</Text>
    );
}

export const TextLite = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Lite}, props.textStyle]}>{props.title}</Text>
    );
}
export const TextThin = (props) => {

    return (
        <Text allowFontScaling={false} ellipsizeMode={props.ellipsizeMode} numberOfLines={props.numberOfLines} style={[{fontFamily: Fonts.Thin}, props.textStyle]}>{props.title}</Text>
    );
}