import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import theme from '@theme';
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import PatientItem from '../../components/patient/PatientItem';

const Patients = ({ navigation }) => {
  const patients = useSelector((state) => state.app.patients);  
  const renderPatient = useMemo(() => {
    if (patients?.length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={{ fontSize: 16 }}>
            Bạn chưa có hồ sơ nào
          </Text>
        </View>
      )
    } else {
      console.log("change patients");
      return (
        <FlatList
          data={patients}
          renderItem={({ item }) => <PatientItem data={item} />}
          keyExtractor={item => item?.id}
        />
      )
    }
  }, [patients])

  const renderLayout = useMemo(() => {    
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="light-content" />
        <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
          <View />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
              Hồ sơ bệnh nhân
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreatePatient");
            }}
          >
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="person-add-sharp" style={{ color: "white", fontSize: 22 }} />
              <Text style={{ color: "white" }}>
                Tạo mới
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {
            patients?.length > 0 ?
              (
                <View style={{ padding: 10, flexDirection: 'row', backgroundColor: "#edf4f9", alignItems: 'center' }}>
                  <AntDesign name="exclamationcircleo" style={{ fontSize: 20 }} />
                  <Text style={{ marginLeft: 10 }}>
                    Vui lòng chọn 1 trong các hồ sơ bên dưới hoặc bấm vào biểu tượng ở trên để thêm hồ sơ người bệnh
                  </Text>
                </View>
              ) : null
          }
          {
            renderPatient
          }
        </View>
      </View>
    )
  }, [patients]);
  return renderLayout;
}

export default Patients