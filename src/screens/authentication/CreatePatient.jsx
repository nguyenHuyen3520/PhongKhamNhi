import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, useWindowDimensions, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import theme from '@theme';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import patientApi from '../../api/patientApi';
import { savePatients } from '../../store/appSlice';

const CreatePatient = ({ navigation }) => {    
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [male, setMale] = useState(true);
    const [name, setName] = useState(null);
    const [note, setNote] = useState(null);
    const bmi = useMemo(() => {
        if (height && weight) {
            return parseFloat(weight) / (parseFloat(height) / 100 * 2);
        }
        return null;
    }, [height, weight]);
    console.log("date: ", date)
    const handleSubmit = async() => {
        // if (!date || !weight || !height || !name || !phone || !email) {
        //     Toast.show({
        //         type: 'customError',
        //         props: {
        //             text2: "Bạn cần nhập đầy đủ thông tin các trường trước khi tạo hồ sơ mới",
        //         },
        //     });
        // }
        const variables = {
            name: name,
            phone: phone,
            email: email,
            height: height,
            weight: weight,
            bmi: bmi,
            gender: male ? 1 : 0,
            note: note,
            age: moment(date).format('L')
        }
        const response = await patientApi.createPatient(variables);
        if(response.success){
            dispatch(savePatients(response.patients));
            Toast.show({
                type: 'success',
                props: {
                    text2: 'Tạo hồ sơ thành công!',
                },
            });
            navigation.goBack();        
        }
    }

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: "#efefef", flex: 1 }}>
            <DatePicker
                modal
                open={open}
                date={date ? date : new Date()}
                mode="date"
                onConfirm={(date) => {
                    console.log("date in handle: ", date)
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                        Tạo mới hồ sơ
                    </Text>
                </View>
                <View />
            </View>
            <ScrollView style={{ padding: 10 }}>
                <Text>
                    Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
                </Text>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, }}>
                        Thông tin bệnh nhân
                    </Text>
                </View>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 8
                }}>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Họ và tên
                        </Text>
                        <TextInput
                            placeholder='Nhập họ tên của bé'
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Số điện thoại
                        </Text>
                        <TextInput
                            placeholder='Nhập số điện thoại của phụ huynh'
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Email
                        </Text>
                        <TextInput
                            placeholder='Nhập email của phụ huynh'
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Ngày sinh
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setOpen(true)
                        }}>
                            {/* <TextInput
                                disabled={false}
                                placeholder='Chọn ngày sinh cho bé'
                                style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            /> */}
                            <View style={{ paddingVertical: 10, paddingBottom: 20, borderBottomWidth: 1, borderColor: "#e0e0e0" }}>
                                <Text>
                                    {date ? moment(date).format('L') : `Chọn ngày sinh cho bé`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Giới tính
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => {
                                setMale(true)
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                    <Text style={{ color: male ? theme.defaultColor : "black", marginRight: 5 }} >
                                        Nam
                                    </Text>
                                    <Ionicons name="male" style={{ color: male ? theme.defaultColor : "black", fontSize: 22 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setMale(false);
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: !male ? theme.defaultColor : "black", marginRight: 5 }} >
                                        Nữ
                                    </Text>
                                    <Ionicons name="ios-female-sharp" style={{ color: !male ? theme.defaultColor : "black", fontSize: 22 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Chiều cao
                        </Text>
                        <TextInput
                            placeholder='Nhập chiều cao của bé'
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            value={height}
                            onChangeText={(text) => setHeight(text)}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Cân nặng
                        </Text>
                        <TextInput
                            placeholder='Nhập cân nặng của bé'
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            value={weight}
                            onChangeText={(text) => setWeight(text)}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            BMI
                        </Text>
                        <View
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", paddingVertical: 10 }}
                        >
                            <Text>
                                {bmi ? bmi : 'Chỉ số BMI'}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        marginVertical: 5, paddingVertical: 5,
                        // borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#e0e0e0"
                    }}>
                        <Text>
                            Ghi chú
                        </Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder='Bé có bị dị ứng gì không?'
                            style={{ borderBottomWidth: 1, borderBottomColor: "#e0e0e0", }}
                            value={note}
                            onChangeText={(text) => setNote(text)}
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={handleSubmit}
            >
                <View style={{ height: 50, flexDirection: 'row', backgroundColor: theme.defaultColor, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: "white", textAlign: 'center', fontWeight: 18, fontWeight: "bold" }}>
                        TẠO MỚI HỒ SƠ
                    </Text>
                </View>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default CreatePatient