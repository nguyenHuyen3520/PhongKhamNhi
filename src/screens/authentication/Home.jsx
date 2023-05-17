import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import theme from '@theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation}) => {
  const patients = useSelector((state) => state.app.patients);
  console.log("patients: ", patients)
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ height: 200, width: Dimensions.get("window").width }}>
        <Image source={require('../../../media/banner.jpg')} style={{ height: 200, width: Dimensions.get("window").width }} resizeMode="cover" />
      </View>
      <View style={{ flex: 1, padding: 15, backgroundColor: "#efefef" }}>
        {
          patients?.length == 0 ? (
            <View style={{ padding: 15, paddingBottom: 0, borderRadius: 8, 
            backgroundColor: theme.defaultColor
            // "#83c14d" 
            }}>
              <View style={{ borderBottomWidth: 1, paddingBottom: 15, borderBottomColor: "white" }}>
                <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
                  Bạn chưa có sổ khám, tạo ngay!
                </Text>
              </View>
              <View style={{ paddingVertical: 10, }}>
                <Text style={{ color: "white", }}>
                  Quyền lợi
                </Text>
                <Text style={{ color: "white", }}>
                  Khám bệnh tại {theme.appName}
                </Text>
              </View>
              <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: "center", }}>

                <Text style={{ color: "white", marginRight: 5 }}>
                  Tạo sổ
                </Text>
                <MaterialIcons name="library-add" style={{ color: "white", fontSize: 22 }} />
              </View>
            </View>
          ) : (
            <View>
              <Text>
                patients
              </Text>
            </View>
          )
        }
        <View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Dịch vụ
            </Text>
          </View>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate("Booking");
            }}
          >
          <View style={{ height: 100, backgroundColor: "white", borderRadius: 8, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{  justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Image source={require('../../../media/icon1.png')} style={{ height: 50, width: 50 }} />
              </View>
              <View style={{ paddingVertical: 15, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Dịch vụ khám bệnh
                </Text>
                <Text>
                  Đăng ký lịch khám bệnh
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons name="greater-than"  style={{fontSize: 22}} />
            
          </View>
          </TouchableOpacity>
          <View style={{ height: 100, backgroundColor: "white", borderRadius: 8, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginTop: 20 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{  justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Image source={require('../../../media/iconMedicine.png')} style={{ height: 50, width: 50 }} />
              </View>
              <View style={{ paddingVertical: 15, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Toa thuốc
                </Text>
                <Text>
                  Toa thuốc đã khám trước đó
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons name="greater-than"  style={{fontSize: 22}} />
          </View>
        </View>
        <View>
        <View style={{ marginVertical: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Tin tức mới nhất
            </Text>
          </View>
          <View>
        
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Home