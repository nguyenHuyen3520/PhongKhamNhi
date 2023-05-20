import { View, Text, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { auth } from "../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import loginApi from '../../api/loginApi';

const schema = yup.object().shape({
    first_name: yup.string().required('Bạn phải nhập họ'),
    last_name: yup.string().required('Bạn phải nhập tên'),
    email: yup.string().email('Không đúng định dạng của email').required('Bạn phải nhập Email'),
    address: yup.string().required('Bạn phải nhập địa chỉ'),
    phone: yup.string().required('Bạn phải nhập số điện thoại'),
});
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { saveProfile } from '../../store/appSlice';
const MyInfoScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.app.profile);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    React.useEffect(() => {
        if (profile) {
            reset({
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                address: profile.address,
                phone: profile.phone,
            })
        }
    }, [profile])
    const onSubmit = async (data) => {
        const response = await loginApi.updateUser({ info: data, id: profile.id });
        console.log("response: ", response);
        if (response.success) {
            dispatch(saveProfile(response.info));
            reset({
                first_name: response.info.first_name,
                last_name: response.info.last_name,
                email: response.info.email,
                address: response.info.address,
                phone: response.info.phone,
            })
            Toast.show({
                type: 'success',
                text1: 'Cập nhật thông tin tài khoản thành công!'
            });
        }
    };
    const renderInput = (title, state, placeholder, keyboardType = 'default', secureTextEntry = false) => {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 10 }}>
                    <Text>
                        {title}:
                    </Text>
                </View>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            style={{ borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: "white" }}
                            // onBlur={onBlur}                                                        
                            keyboardType={keyboardType}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            editable={state == 'phone' ? false : true}
                        />
                    )}
                    name={state}
                />
                {errors[state] && <Text style={{ marginTop: 5, color: 'red' }}>{errors[state].message}</Text>}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                        Thông tin tài khoản
                    </Text>
                </View>
                <View />
            </View>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <View>
                    <Text>
                        Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
                    </Text>
                </View>
                {renderInput('Họ', 'first_name', 'Nhập họ')}
                {renderInput('Tên', 'last_name', 'Nhập tên')}
                {renderInput('Số điện thoại', 'phone', 'Nhập số điện thoại')}
                {renderInput('Email', 'email', 'Nhập email')}
                {renderInput('Địa chỉ', 'address', 'Nhập địa chỉ')}
                {/* {renderInput('Mật khẩu', 'password', 'Nhập mật khẩu', 'default', true)}
                {renderInput('Xác nhận mật khẩu', 'confirmPassword', 'Nhập xác nhận mật khẩu', 'default', true)} */}
                <View style={{ marginTop: 30, borderRadius: 8, backgroundColor: theme.defaultColor, padding: 10, paddingHorizontal: 15 }} >
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} >
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: "bold" }}>
                            Lưu thông tin
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        // </ImageBackground>
    )
}

export default MyInfoScreen