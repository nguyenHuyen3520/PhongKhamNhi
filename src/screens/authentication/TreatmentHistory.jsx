import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import patientApi from '../../api/patientApi';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
import Item from '../../components/Supplices/Item';
const TreatmentHistory = ({ navigation }) => {
    const { patientDetail } = useSelector((state) => state.app);
    console.log("patientDetail: ", patientDetail);
    const [data, setData] = useState(null);
    const getData = async (id) => {
        console.log("id: ", id)
        const response = await patientApi.getTreatment(id);
        console.log("response: ", response);
        if (response.success && response.data?.Supplies?.length > 0) {
            setData(response.data);
        }
    }
    useEffect(() => {
        if (patientDetail) {
            getData(patientDetail.id);
        }
    }, [patientDetail]);
    const render = useMemo(() => {
        if (!patientDetail) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 16 }}>
                        Bạn chưa có hồ sơ nào
                    </Text>
                </View>
            )
        } else if (patientDetail && !data) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 16 }}>
                        Bạn chưa có đơn thuốc nào với hồ sơ này
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView style={{ padding: 10, marginBottom: 10 }}>
                        <View >
                            <View style={{
                                borderWidth: 1, padding: 10, borderRadius: 8,
                                // shadowColor: "#000",
                                // shadowOffset: {
                                //     width: 0,
                                //     height: 1,
                                // },
                                // shadowOpacity: 0.20,
                                // shadowRadius: 1.41,                            
                                // elevation: 2,
                            }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: 'center' }}>
                                    Thông tin hồ sơ khám:
                                </Text>
                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ fontWeight: "bold", }}>
                                            Tên:
                                        </Text>
                                        <Text style={{ marginLeft: 5 }}>
                                            {patientDetail.name}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ fontWeight: "bold", }}>
                                            Dịch vụ khám:
                                        </Text>
                                        <Text style={{ marginLeft: 5 }}>
                                            {data?.Service.service_name}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ fontWeight: "bold", }}>
                                            Chuẩn đoán:
                                        </Text>
                                        <Text style={{ marginLeft: 5 }}>
                                            {data?.symptom}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ fontWeight: "bold", }}>
                                            Điều trị:
                                        </Text>
                                        <Text style={{ marginLeft: 5, width: Dimensions.get("window").width - 100 }}>
                                            {data?.treatment}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: 1, padding: 10, borderRadius: 8, marginTop: 30
                            // shadowColor: "#000",
                            // shadowOffset: {
                            //     width: 0,
                            //     height: 1,
                            // },
                            // shadowOpacity: 0.20,
                            // shadowRadius: 1.41,                            
                            // elevation: 2,
                        }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: 'center' }}>
                                Thông tin đơn thuốc:
                            </Text>
                            <View>
                                {
                                    data?.Supplies && data?.Supplies?.map((item, index) => (
                                        <Item key={index} data={item} index={index} />
                                    ))
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }

    }, [patientDetail, data]);
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
                        Toa thuốc
                    </Text>
                </View>
                <View />
            </View>
            {render}
        </View>
    )
}

export default TreatmentHistory