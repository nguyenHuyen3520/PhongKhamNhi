import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import LottieView from 'lottie-react-native';
const LoadingComponent = (props) => {
    const loading = useSelector((state) => state.app.loading);
    if(loading){
        return (
            <View style={{height, width, zIndex: 99,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <LottieView source={require('../../../media/98194-loading.json')} autoPlay={true} loop={true} style={{ width: 150, aspectRatio: 1 }} />
            </View>
          )
    }else{
        return null;
    }
  
}

export default LoadingComponent