import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import theme from '../../configApp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import loginApi from '../../api/loginApi';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/appSlice';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Item from './../../components/Supplices/Item';
const BookingDetail = ({ navigation, route }) => {
    const loading = useSelector((state) => state.app.loading);
    const { booking_id } = route.params;
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const getBookingDetail = async (booking_id) => {
        const response = await loginApi.getBookingDetail(booking_id);
        console.log("response: ", response)
        if (response.success) {
            setData(response.data);
        }
        dispatch(setLoading(false));
    }
    useEffect(() => {
        if (booking_id) {
            dispatch(setLoading(true));
            getBookingDetail(booking_id);
        }
    }, [booking_id])

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
                        Chi tiết phiếu khám
                    </Text>
                </View>
                <View />
            </View>
            {
                data && <ScrollView style={{ paddingVertical: 10 }}>
                    <View style={{
                        margin: 15, marginVertical: 10, borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 12, padding: 15, position: 'relative',
                        backgroundColor: 'white', marginBottom: 20
                    }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                Thông tin hồ sơ khám
                            </Text>
                        </View>
                        {
                            data?.Patient?.name ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <FontAwesome5 name="user-circle" style={{ fontSize: 20, marginRight: 10 }} />
                                    <Text>
                                        {data?.Patient?.name}
                                    </Text>
                                </View>
                            ) : null
                        }
                        {
                            data?.Patient?.phone ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>

                                    <MaterialIcons name="smartphone" style={{ fontSize: 20, marginRight: 10 }} />
                                    <Text>
                                        {data?.Patient?.phone}
                                    </Text>
                                </View>
                            ) : null
                        }
                        {
                            data?.Patient?.age ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <MaterialIcons name="cake" style={{ fontSize: 20, marginRight: 10 }} />
                                    <Text>
                                        {data?.Patient?.age}
                                    </Text>
                                </View>
                            ) : null
                        }
                        {
                            data?.Patient?.address ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <FontAwesome5 name="map-marker-alt" style={{ fontSize: 20, marginRight: 10 }} />
                                    <Text>
                                        {data?.Patient?.address}
                                    </Text>
                                </View>
                            ) : null
                        }
                    </View>
                    <View style={{
                        margin: 15, marginVertical: 10, borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 12, padding: 15, position: 'relative',
                        backgroundColor: 'white', marginBottom: 20
                    }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                Thông tin lịch khám
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                                Ngày khám:
                            </Text>
                            <Text>{moment.unix(data.date).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                                Giờ khám:
                            </Text>
                            <Text>
                                {data.time}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                                Bác sĩ khám:
                            </Text>
                            <Text>
                                {data.User.sku} {data.User.first_name} {data.User.last_name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                                Dịch vụ khám:
                            </Text>
                            <Text>
                                <Text>
                                    {data.Service.service_name}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                                Trạng thái:
                            </Text>
                            <Text>
                                {data.status == 1 ? "Đang chờ xác nhân" : data.status == 2 ? "Chưa khám" : data.status == 3 ? "Chưa thanh toán" : "Đã thanh toán"}
                            </Text>
                        </View>
                    </View>
                    {
                        data?.Supplies && data?.Supplies?.length > 0 ? (
                            <View View style={{
                                margin: 15, marginVertical: 10, borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 12, padding: 15, position: 'relative',
                                backgroundColor: 'white', marginBottom: 20
                            }}>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                        Thông tin đơn thuốc
                                    </Text>
                                </View>
                                <View>
                                    {
                                        data?.Supplies && data?.Supplies?.map((item, index) => (
                                            <Item key={index} data={item} index={index} />
                                        ))
                                    }
                                </View>
                            </View>
                        ) : null
                    }

                </ScrollView>
            }
        </View>
    )
}

export default BookingDetail