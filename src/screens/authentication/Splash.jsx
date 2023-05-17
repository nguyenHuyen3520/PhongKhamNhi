import { View, Text, Image } from 'react-native'
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { saveProfile, saveToken, savePatients, saveNotifications, saveBills, saveServices, saveDoctors, saveBookings, savePatientDetail } from '../../store/appSlice'
import loginApi from '../../api/loginApi';
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const getToken = async ()=>{
    return await AsyncStorage.getItem('accessToken');
  }
  const getData = async () => {
    const token = await getToken();
    if(token){
      const response = await loginApi.loginAccessToken(token);      
      if (response.success) {
        let bookings = [];
        dispatch(saveProfile(response.info));
        dispatch(savePatients(response.info.Patients));
        response.info.Patients.map((item)=>{          
          if(item?.Bookings?.length > 0){
              bookings.push(...item.Bookings);
          }
        })
        dispatch(saveNotifications(response.info.Notifications));
        dispatch(saveBookings(bookings));
        dispatch(savePatientDetail(response.info.Patients.filter(item => item.is_default == 1)));  
        dispatch(saveServices(response.services));
        dispatch(saveDoctors(response.doctors));
        dispatch(saveBills(response.info.Bills));
        navigation.navigate("BottomTab");
      }else if(!response.success && !response.timeLife){
        navigation.navigate("Login");
      }          
    }else{
      navigation.navigate("Login");
    }
  }
  useEffect(() => {
    getData();
  },[]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <LottieView source={require('../../../media/56120-medical-shield.json')} autoPlay={true} loop={true} style={{ width: 150, aspectRatio: 1 }} />
    </View>
  )
}

export default Splash