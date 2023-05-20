import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
            Cá nhân
          </Text>
        </View>
        <View />
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <View style={{ height: 200, backgroundColor: theme.defaultColor, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: profile?.image }}
            style={{ height: 70, width: 70 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "white", marginTop: 10 }}>
            {profile?.first_name} {profile?.last_name}
          </Text>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyInfoScreen");
              }}
            >
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="user" style={{ fontSize: 22 }} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>
                    Thông tin cá nhân
                  </Text>
                </View>
                <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="md-key-outline" style={{ fontSize: 22 }} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>
                    Đổi mật khẩu
                  </Text>
                </View>
                <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let phoneNumber = '0898731845';
                const phoneUrl = `tel:${phoneNumber}`;
                Linking.openURL(phoneUrl);
              }}
            >
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="support-agent" style={{ fontSize: 22 }} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>
                    Liên hệ tư vấn
                  </Text>
                </View>
                <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let subtitle = "Báo lỗi quá trình sử dụng app";
                const mailtoUrl = `mailto:nguyenhuyennd1211@gmail.com?subject=${encodeURIComponent(subtitle)}`;
                Linking.openURL(mailtoUrl);
              }}
            >
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="error-outline" style={{ fontSize: 22 }} />
                  <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>
                    Báo lỗi
                  </Text>
                </View>
                <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(removeToken());
                navigation.navigate("Login");
              }}
            >
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                <Text style={{ color: "red" }}>
                  Đăng xuất
                </Text>
                <MaterialCommunityIcons name="greater-than" style={{ fontSize: 16 }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Powered By Dev Huyen
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Copyright 2023. Version 0.0.1
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Account
