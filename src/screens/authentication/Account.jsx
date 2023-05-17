import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '@theme';
import { useDispatch, useSelector } from 'react-redux'
import { removeToken } from '../../store/appSlice';
const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.app.profile);
  console.log("profile: ", profile);
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
            {profile?.first_name} {profile?.last_name}
          </Text>
        </View>
        <View />
      </View>
      <View style={{ padding: 10 }}>


        <View style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 8,
        }}>
          <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
            <Text>
              Thông tin cá nhân
            </Text>
            <MaterialCommunityIcons name="greater-than" style={{ fontSize: 22 }} />
          </View>
          <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
            <Text>
              Danh sách lịch khám
            </Text>
            <MaterialCommunityIcons name="greater-than" style={{ fontSize: 22 }} />
          </View>
          <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
            <Text>
              Đổi mật khẩu
            </Text>
            <MaterialCommunityIcons name="greater-than" style={{ fontSize: 22 }} />
          </View>
          <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
            <Text>
              Liên hệ tư vấn
            </Text>
            <MaterialCommunityIcons name="greater-than" style={{ fontSize: 22 }} />
          </View>
          <TouchableOpacity
            onPress={()=>{
              dispatch(removeToken());
              navigation.navigate("Login");
            }}
          >
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
              <Text style={{ color: "red" }}>
                Đăng xuất
              </Text>
              <MaterialCommunityIcons name="greater-than" style={{ fontSize: 22 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Account
