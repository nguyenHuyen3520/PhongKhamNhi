import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
import { formatCurrency } from "react-native-format-currency";
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedService } from '../../store/appSlice';
const Services = ({ navigation }) => {
    const services = useSelector((state) => state.app.services);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState(null);
    const renderItem = ({ item }) => {
        const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
            formatCurrency({ amount: Number(item?.price), code: "VND" });
        return (
            <TouchableOpacity
                onPress={() => {
                    dispatch(saveSelectedService(item));
                    navigation.navigate("Booking");
                }}
                style={{
                    backgroundColor: "white", padding: 10, borderRadius: 12, marginBottom: 20, borderWidth: 1,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }}
            >
                <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: "space-between" }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16 }}>
                        {item.service_name.toUpperCase()}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 16 }}>
                        {valueFormattedWithSymbol}
                    </Text>
                </View>
                <Text>
                    ({item.description})
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white", }}>
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                        Danh sách dịch vụ khám
                    </Text>
                </View>
                <View />
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}

                style={{ padding: 10 }}
            />
        </View>
    )
}

export default Services