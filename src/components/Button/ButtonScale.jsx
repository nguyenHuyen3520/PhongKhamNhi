import {  Animated, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const ButtonScale = (props) => {
    const {onPress = {}, children, style={}} = props;
    const animatedButtonScale = new Animated.Value(1);
    const onPressIn = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    // When button is pressed out, animate the scale back to 1
    const onPressOut = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }]
    };
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={style}
        >
            <Animated.View style={[ animatedScaleStyle]}>
                {
                    children
                }
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonScale