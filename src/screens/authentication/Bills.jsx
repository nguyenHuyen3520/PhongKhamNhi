import { View, Text, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useMemo, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '@theme';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { saveBookings } from '../../store/appSlice';
import loginApi from '../../api/loginApi';
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
    label: 'Chưa thanh toán',
    value: 3
  },
  {
    label: 'Đã thanh toán',
    value: 4
  }
]
const Bills = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(1);
  const bookings = useSelector((state) => state.app.bookings);
  const [refreshing, setRefreshing] = React.useState(false);
  const getBookings = async () => {
    const response = await loginApi.getBookings();
    let data = [];
    if (response.success) {
      response?.info?.Patients.map((item) => {
        if (item?.Bookings?.length > 0) {
          data.push(...item.Bookings);
        }
      })
      dispatch(saveBookings(data));
      setRefreshing(false);
    }
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getBookings();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,

          // elevation: 5,

        }}
        onPress={() => {
          navigation.navigate("BookingDetail", { booking_id: item.id })
        }} >
        <View style={{
          padding: 20, borderRadius: 15, marginBottom: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#e0e0e0'
        }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Ngày khám:
            </Text>
            <Text>{moment.unix(item.date).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Giờ khám:
            </Text>
            <Text>
              {item.time}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Bác sĩ khám:
            </Text>
            <Text>
              {item.User.sku} {item.User.first_name} {item.User.last_name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Dịch vụ khám:
            </Text>
            <Text>
              <Text>
                {item.Service.service_name}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              Trạng thái:
            </Text>
            <Text>
              {item.status == 1 ? "Đang chờ xác nhận" : item.status == 2 ? "Chờ khám" : item.status == 3 ? "Chờ thanh toán" : "Đã thanh toán"}
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
        <ScrollView style={{ padding: 10, height: 50 }} horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            listData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setStatus(item.value)
                }}
              >
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: status == item.value ? theme.defaultColor : "#e0e0e0", paddingHorizontal: 15, borderRadius: 90, marginRight: 10 }}>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
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