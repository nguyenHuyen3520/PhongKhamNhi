import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import patientApi from '../../api/patientApi';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
import { saveSelectedTime } from '../../store/appSlice';
const Time = ({ navigation }) => {
    const selectedService = useSelector((state) => state.app.selectedService);
    const selectedDoctor = useSelector((state) => state.app.selectedDoctor);
    const selectedCalendar = useSelector((state) => state.app.selectedCalendar);
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const getDate = async () => {
        const response = await patientApi.getCalendar({ doctorId: selectedDoctor.id, serviceId: selectedService.id, date: selectedCalendar });
        if (response.success) {
            setData(response.bookings);
        }
    }
    useEffect(() => {
        getDate();
    }, []);
    if (!data) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else {        
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
                            Chọn giờ khám
                        </Text>
                    </View>
                    <View />
                </View>
                <View style={{ padding: 20 }}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>
                            Thông tin giờ khám
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10, marginRight: 30 }}>
                            <View style={{ height: 30, width: 30, borderColor: theme.defaultColor, marginRight: 10, borderRadius: 5, borderWidth: 1 }} />
                            <Text>
                                Còn trống
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10 }}>
                            <View style={{ height: 30, width: 30, marginRight: 10, borderRadius: 5, backgroundColor: "#e0e0e0" }} />
                            <Text>
                                Kín khung giờ
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20, flexWrap: 'wrap' }}>
                        {
                            data.sort((a, b) => a.sort - b.sort).map((item) => (
                                <TouchableOpacity key={item.id}
                                    onPress={()=>{                                        
                                        dispatch(saveSelectedTime(item));
                                        navigation.navigate("Booking");
                                    }}
                                >
                                    <View style={{padding: 10, paddingHorizontal: 20,  backgroundColor: item.status == 0 ? "white" : "#e0e0e0", borderRadius: 5, borderWidth: item.status == 0 ? 1 : 0, margin: 10, borderColor: item.status == 0 ? theme.defaultColor : "white"}}>
                                        <Text>
                                            {item.time}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default Time