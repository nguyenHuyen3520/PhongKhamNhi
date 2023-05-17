import { View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import * as React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { auth } from "../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile, saveToken, savePatients, saveNotifications, saveBills, savePatientDetail, saveServices, saveDoctors, saveBookings } from '../../store/appSlice'
// import { signInWithEmailAndPassword } from "firebase/auth";
import loginApi from '../../api/loginApi';
import fetchQuery from '../../api/fetchApi';


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

const LoginScreen = (props) => {
    console.log("LoginScreen")
    const { navigation } = props;
    const dispatch = useDispatch();
    const [phone, setPhone] = React.useState('0898731845');
    const [password, setPassword] = React.useState('Huyen3520@');
    // const { control, handleSubmit, formState: { errors, data }, reset } = useForm({
    //     resolver: yupResolver(schema),
    //     defaultValues: {
    //         email: 'huyennv@bsscommerce.com',
    //         password: 'Huyen3520@'
    //     }
    // });
    const onSubmit = async (data) => {
        // const response = await fetchQuery("/login?phone="+data.phone+"&password="+data.password, 'GET');              
        const response = await loginApi.login(data);
        // const response = await fetchQuery("/login?phone="+data.phone+"&password="+data.password)
        console.log("response: ", response);
        if (response.success) {
            await AsyncStorage.setItem("accessToken", response.accessToken);
            let bookings = [];
            dispatch(saveToken(response.accessToken));
            dispatch(saveProfile(response.info));
            const responseInfo = await loginApi.getInfo();
            if (responseInfo) {
                dispatch(savePatients(responseInfo?.info?.Patients));
                responseInfo?.info?.Patients.map((item) => {
                    if (item?.Bookings?.length > 0) {
                        bookings.push(...item.Bookings);
                    }
                })
                dispatch(savePatientDetail(responseInfo?.info?.Patients.filter(item => item.is_default == 1)));
                dispatch(saveNotifications(responseInfo?.info?.Notifications));
                dispatch(saveServices(responseInfo?.services));
                dispatch(saveDoctors(responseInfo?.doctors));
                dispatch(saveBookings(bookings));
                dispatch(saveBills(responseInfo?.info?.Bills));
            }

            navigation.navigate("BottomTab");
        }
    };
    return (
        <ImageBackground source={require('../../../media/login.jpg')} resizeMode="cover" style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <View>
                    <Text style={{ fontSize: 20, paddingVertical: 20, fontWeight: "bold" }}>
                        Phòng khám nhi H
                    </Text>
                </View>
                <View>
                    <View>
                        <Text style={{ marginBottom: 10 }}>
                            Số điện thoại:
                        </Text>
                        <TextInput
                            style={{ borderWidth: 1, width: 300, borderRadius: 5, paddingHorizontal: 10, backgroundColor: "white" }}
                            // onBlur={onBlur}
                            onChangeText={(text) => {
                                setPhone(text);
                            }}
                            value={phone}
                            keyboardType='numeric'
                            placeholder="Nhập số điện thoại"
                        />
                    </View>
                    <View>
                        <Text style={{ marginBottom: 10, marginTop: 10 }}>
                            Mật khẩu:
                        </Text>
                        <TextInput
                            style={{ borderWidth: 1, width: 300, borderRadius: 5, paddingHorizontal: 10, backgroundColor: "white" }}
                            // onBlur={onBlur}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                            value={password}
                            secureTextEntry={true}
                            placeholder="Nhập mật khẩu"
                        />
                        {/* <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{ borderWidth: 1, width: 300, borderRadius: 5, paddingHorizontal: 10 }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                            />
                        )}
                        name="password"
                    />
                    {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}.</Text>} */}
                    </View>
                </View>
                <View style={{ width: 300, marginTop: 30, borderRadius: 8, backgroundColor: '#0994f1', padding: 10, paddingHorizontal: 15 }} >
                    <TouchableOpacity onPress={() => {
                        // handleSubmit(onSubmit)                        
                        onSubmit({
                            phone,
                            password
                        })
                    }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: "bold" }}>
                            Đăng Nhập
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text>
                        -------------------------------
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        Nếu bạn chưa có tài khoản?

                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("PhoneNumber")}
                    >
                        <Text style={{ fontWeight: 'bold', color: 'blue', marginLeft: 10 }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default LoginScreen