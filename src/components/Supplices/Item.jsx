import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formatCurrency } from "react-native-format-currency";
const Item = (props) => {
    const { index, data } = props;
    const [show, setShow] = useState(true);
    return (
        <View key={index} style={{ paddingVertical: 10, }}>
            <TouchableOpacity
                onPress={() => {
                    setShow(!show)
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {index + 1}. {data.name}
                    </Text>
                    {
                        !show ? <AntDesign name="caretup" style={{ fontSize: 16 }} /> : <AntDesign name="caretdown" style={{ fontSize: 16 }} />
                    }
                </View>
            </TouchableOpacity>
            {
                show ? (
                    <View style={{ padding: 10 }}>
                        <View style={{}}>
                            <Text>
                                <Text style={{ fontWeight: "bold", }}>
                                    Số lượng:
                                </Text> {data?.Booking_Supplies?.quantity} {data?.unit}
                            </Text>
                        </View>
                        <View style={{marginVertical: 5}}>
                            <Text>
                                <Text style={{ fontWeight: "bold", }}>
                                    Gía tiền:
                                </Text> {formatCurrency({ amount: Number(data?.price), code: "VND" })} / {data?.unit}
                            </Text>
                        </View>
                        <View style={{marginVertical: 5}}>
                            <Text>
                                <Text style={{ fontWeight: "bold", }}>
                                    Cách dùng:
                                </Text> {data?.Booking_Supplies?.note}
                            </Text>
                        </View>
                    </View>
                ) : null
            }
        </View>
    )
}

export default Item