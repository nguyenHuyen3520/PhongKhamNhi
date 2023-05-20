import { View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import * as React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { auth } from "../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile, saveToken, savePatients, saveNotifications, saveBills, savePatientDetail, saveServices, saveDoctors, saveBookings, setLoading } from '../../store/appSlice'
// import { signInWithEmailAndPassword } from "firebase/auth";
import loginApi from '../../api/loginApi';
import theme from '../../configApp';
const schema = yup.object().shape({
    phone: yup.string().required('Bạn phải nhập số điện thoại'),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(32).required('Bạn phải nhập mật khẩu'),
});

const LoginScreen = (props) => {    
    const { navigation } = props;
    const {params} = props.route;
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors, reset } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '0898731845',
            password: 'Huyen3520@'
        }
    });
    React.useEffect(()=>{
        if(params && params?.account){
            reset({
                phone: params.account?.phone ? params.account?.phone : '',
                password: params.account?.password ? params.account?.password : ''
            })
        }
    },[params])    
    const onSubmit = async (data) => {        
        const response = await loginApi.login(data);        
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
                dispatch(savePatientDetail(responseInfo?.info?.Patients.find(item => item.is_default == 1)));
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
        // <ImageBackground source={require('../../../media/login.jpg')} resizeMode="cover" style={{
        //     flex: 1,
        //     justifyContent: 'center',
        // }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <View>
                <Text style={{ fontSize: 20, paddingVertical: 20, fontWeight: "bold" }}>
                    Phòng khám nhi H
                </Text>
            </View>
            <View>
                <View>
                    <View style={{ marginBottom: 10 }}>
                        <Text>
                            Số điện thoại:
                        </Text>
                    </View>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={{ borderWidth: 1, width: 300, borderRadius: 8, paddingHorizontal: 10, backgroundColor: "white" }}
                                // onBlur={onBlur}                                                        
                                keyboardType='numeric'
                                placeholder="Nhập số điện thoại"
                            />
                        )}
                        name="phone"
                    />
                </View>
                {errors.phone && <Text style={{ marginTop: 5, color: 'red' }}>{errors.phone.message}</Text>}
                <View style={{ marginTop: 20 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text>
                            Mật khẩu:
                        </Text>
                    </View>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                secureTextEntry={true}
                                placeholder="Nhập mật khẩu"
                                style={{ borderWidth: 1, width: 300, borderRadius: 8, paddingHorizontal: 10, backgroundColor: "white" }}
                            />
                        )}
                        name="password"
                    />
                </View>
                {errors.password && <Text style={{ marginTop: 5, color: 'red' }}>{errors.password.message}</Text>}
            </View>
            <View style={{ width: 300, marginTop: 30, borderRadius: 8, backgroundColor: theme.defaultColor, padding: 10, paddingHorizontal: 15 }} >
                <TouchableOpacity onPress={handleSubmit(onSubmit)} >
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
        // </ImageBackground>
    )
}

export default LoginScreen