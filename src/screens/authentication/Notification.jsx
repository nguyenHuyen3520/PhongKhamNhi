import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '@theme';
import { useSelector,useDispatch  } from 'react-redux';
import notificationApi from '../../api/notificationApi';
import { saveNotifications } from '../../store/appSlice';



const Notification = ({ navigation }) => {
  const notifications = useSelector((state) => state.app.notifications);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleReadAll = async ()=>{
    const response = await notificationApi.readAll();
    if(response.success){
      dispatch(saveNotifications(response.notifications));      
    }
    setLoading(false);
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
            Danh sách thông báo
          </Text>
        </View>
        <TouchableOpacity
          onPress={()=>{
            setLoading(true);
            handleReadAll();
          }}
        >
          <MaterialCommunityIcons name="playlist-check" style={{ color: "white", fontSize: 22 }} />
        </TouchableOpacity>
      </View>
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <ActivityIndicator size="large" />
          </View>
        ) :
          notifications?.length > 0 ? (
            <ScrollView style={{padding: 10, backgroundColor: "white"}}>
              {
                notifications.map((item) => (
                  <TouchableOpacity onPress={() => {

                  }}
                    key={item.id}
                  >
                    <View style={{ padding: 10, backgroundColor: item.status == 1 ? "#e0e0e0" : "white", borderRadius: 5, borderColor: "#e0e0e0", borderWidth: 1, marginBottom: 10 }}>
                      <Text>
                        {item.content}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          ) : (
            <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
              <Text>
                Bạn chưa có thông báo nào
              </Text>
            </View>
          )
      }

    </View>
  )
}

export default Notification
