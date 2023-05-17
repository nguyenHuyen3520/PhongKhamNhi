import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '@theme';
import { useSelector } from 'react-redux';
import moment from 'moment';
const listData = [
  {
    label: 'Chờ xác nhận',
    value: 1
  },
  {
    label: 'Chưa khám',
    value: 2
  },
  {
    label: 'Đã khám',
    value: 3
  }
]
const Bills = ({ navigation }) => {
  const [status, setStatus] = useState(1);
  const bookings = useSelector((state) => state.app.bookings);
  const renderItem = ({ item }) => {
    console.log("item: ", item)
    return (
      <TouchableOpacity onPress={() => {

      }} >
        <View style={{ borderWidth: 1, padding: 20, borderRadius: 5, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Ngày khám:
            </Text>
            <Text>{moment.unix(item.date).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Giờ khám:
            </Text>
            <Text>
              {item.time}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Bác sĩ khám:
            </Text>
            <Text>
              {item.User.sku} {item.User.first_name} {item.User.last_name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Dịch vụ khám:
            </Text>
            <Text>
              <Text>
                {item.Service.service_name}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Trạng thái:
            </Text>
            <Text>
              {item.status == 1 ? "Đang chờ xác nhân" : item.status == 2 ? "Chưa khám" : "Đã khám"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const data = useMemo(() => {
    return bookings.filter((item) => item.status === status);
  }, [bookings, status]);

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
            Danh sách phiếu khám bệnh
          </Text>
        </View>
        <View />
      </View>
      <View style={{ height: 70 }}>
        <ScrollView style={{ padding: 10, height: 70 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            listData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setStatus(item.value)
                }}
              >
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: status == item.value ? theme.defaultColor : "#e0e0e0", padding: 10, paddingHorizontal: 20, borderRadius: 10, marginHorizontal: 5 }}>
                  <Text style={{ color: status == item.value ? "white" : "black" }}>
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
      {
        data?.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{ padding: 10 }}
          />
          // data.map((item) => (
          //   <TouchableOpacity onPress={() => {

          //   }}
          //     key={item.id}
          //   >
          //     <View style={{ borderWidth: 1 }}>
          //       <Text style={{ fontWeight: 'bold' }}>
          //         Ngày khám: {moment.unix(item.date).format("DD/MM/YYYY")}
          //       </Text>
          //       <Text style={{ fontWeight: 'bold', marginVariation: 5 }}>
          //         Giờ khám: {item.time}
          //       </Text>
          //     </View>
          //   </TouchableOpacity>
          // ))
        ) : (
          <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              Bạn chưa có phiếu khám nào
            </Text>
          </View>
        )
      }

    </View>
  )
}

export default Bills