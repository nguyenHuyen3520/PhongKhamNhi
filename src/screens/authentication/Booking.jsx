import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import theme from '../../configApp';
import { useDispatch, useSelector } from 'react-redux';
import patientApi from '../../api/patientApi';
import Toast from 'react-native-toast-message';
import { resetBooking, saveBookings, saveNotifications } from '../../store/appSlice';
const Booking = ({ navigation }) => {
    const selectedService = useSelector((state) => state.app.selectedService);
    const selectedDoctor = useSelector((state) => state.app.selectedDoctor);
    const selectedCalendar = useSelector((state) => state.app.selectedCalendar);
    const selectedTime = useSelector((state) => state.app.selectedTime);
    const patients = useSelector((state) => state.app.patients);
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const response = await patientApi.createSchedule({ doctorId: selectedDoctor.id, serviceId: selectedService.id, date: selectedCalendar, bookingId: selectedTime.id, date: selectedTime.date, time: selectedTime.time, patientId: patients.find(item => item.is_default == 1).id });
        dispatch(saveBookings(response.bookings));
        dispatch(saveNotifications(response.notifications));
        dispatch(resetBooking());
        Toast.show({
            type: 'success',
            text2: 'Đặt lịch khám thành công!',
        });
        navigation.navigate(
            "Phiếu khám"
        )
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
                        Đặt lịch khám bệnh
                    </Text>
                </View>
                <View />
            </View>
            <View style={{ margin: 20, }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Doctors");
                    }}
                >
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", flexDirection: "row", alignItems: "center", }}>
                        <View style={{ height: 40, width: 40, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: theme.defaultColor, marginRight: 20, borderRadius: 5 }}>
                            <FontAwesome5 name="briefcase-medical" style={{ color: "white", fontSize: 22 }} />
                        </View>
                        <View>
                            {selectedDoctor ?
                                <Text style={{ marginBottom: 5 }}>
                                    Chọn bác sĩ khám
                                </Text> : null}
                            <Text style={{}}>
                                {
                                    selectedDoctor ? selectedDoctor.sku + " " + selectedDoctor.first_name + " " + selectedDoctor.last_name : "Chọn bác sĩ"
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Services");
                    }}
                >
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <View style={{ height: 40, width: 40, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: theme.defaultColor, marginRight: 20, borderRadius: 5 }}>
                            <FontAwesome5 name="hand-holding-medical" style={{ color: "white", fontSize: 22 }} />
                        </View>
                        <View>
                            {
                                selectedService ? (
                                    <Text>
                                        Chọn dịch vụ khám
                                    </Text>
                                ) : null
                            }
                            <Text style={{ fontWeight: "bold", marginTop: 5 }}>
                                {
                                    selectedService ? selectedService.service_name : "Chọn dịch vụ khám"
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Calendar");
                    }}
                >
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <View style={{ height: 40, width: 40, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: theme.defaultColor, marginRight: 20, borderRadius: 5 }}>
                            <FontAwesome5 name="calendar-alt" style={{ color: "white", fontSize: 22 }} />
                        </View>
                        <View>
                            {
                                selectedCalendar ? (
                                    <Text style={{}}>
                                        Chọn ngày khám
                                    </Text>
                                ) : null
                            }
                            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                                {
                                    selectedCalendar ? moment.unix(selectedCalendar).format("DD/MM/YYYY") : "Chọn ngày khám"
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Time");
                    }}
                >
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <View style={{ height: 40, width: 40, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: theme.defaultColor, marginRight: 20, borderRadius: 5 }}>
                            <AntDesign name="clockcircleo" style={{ color: "white", fontSize: 22 }} />
                        </View>
                        <View>
                            {
                                selectedTime ?
                                    <Text style={{}}>
                                        Chọn giờ đăng ký tiếp nhận
                                    </Text> : null
                            }
                            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                                {
                                    selectedTime ? selectedTime.time : "Chọn giờ đăng ký tiếp nhận"
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: 50, backgroundColor: theme.defaultColor, }} >
                <TouchableOpacity onPress={handleSubmit} style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", flex: 1 }}>
                    <Text style={{ color: "white" }}>
                        ĐĂNG KÝ KHÁM BỆNH
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Booking