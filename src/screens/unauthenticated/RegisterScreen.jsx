import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const RegisterScreen = (props) => {
  const { navigation } = props;
  return (
    <TouchableOpacity onPress={()=>{
      navigation.goBack();
    }}>
      <View>
        <Text>back</Text>
      </View>
    </TouchableOpacity>
  )
}

export default RegisterScreen