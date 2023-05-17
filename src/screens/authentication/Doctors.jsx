import { View, Text, TouchableOpacity, Image, Modal, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedDoctor } from '../../store/appSlice';
const Doctors = ({ navigation }) => {
    const doctors = useSelector((state) => state.app.doctors);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);    
    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, position: "relative" }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 22,
                        backgroundColor: 'black',
                        opacity: 0.6
                    }} />
                    <View style={{
                        position: "absolute",
                        right: 20,
                        left: 20,
                        top: "30%",
                        backgroundColor: 'white',
                        borderRadius: 10,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                            <Image source={{ uri: data?.image }} style={{ height: 80, width: 80, borderRadius: 999, marginRight: 20 }} />
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                                    {data?.sku + " " + data?.first_name + " " + data?.last_name}
                                </Text>
                                <Text>
                                    Chuyên khoa nhi
                                </Text>
                            </View>
                        </View>
                        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Mô tả
                            </Text>
                            <Text>
                                {data?.description}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                            <TouchableOpacity
                                style={{ width: "50%", }}
                                onPress={() => {
                                    setModalVisible(false)
                                }
                                }
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text>
                                        Đóng
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(saveSelectedDoctor(data));
                                    navigation.navigate("Booking");
                                }}
                            >
                                <View style={{ width: "50%", flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: theme.defaultColor }}>
                                        Chọn
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                        Danh sách bác sĩ
                    </Text>
                </View>
                <View />
            </View>
            <ScrollView style={{ padding: 10 }}>
                {
                    doctors && doctors.map((item, index) => (
                        <View key={index} style={{ borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 5, marginBottom: 20 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setData(item);
                                    setModalVisible(true);
                                }}
                            >
                                <View style={{ flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                                    <Image source={{ uri: item.image }} style={{ height: 60, width: 60, borderRadius: 999, marginRight: 20 }} />
                                    <View>
                                        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                                            {item.sku + " " + item.first_name + " " + item.last_name}
                                        </Text>
                                        <Text>
                                            Chuyên khoa nhi
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(saveSelectedDoctor(item));
                                    navigation.navigate("Booking");
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', padding: 10 }}>
                                    <Text style={{ color: theme.defaultColor, fontWeight: "bold" }}>
                                        Chọn
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Doctors