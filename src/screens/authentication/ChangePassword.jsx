import { View, Text, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
// import { auth } from "../../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import loginApi from '../../api/loginApi';

const schema = yup.object().shape({
    oldPassword: yup
        .string()
        .required('Bạn phải nhập mật khẩu cũ')
        .min(8, 'Mật khẩu ít nhất có 8 ký tự'),
    newPassword: yup
        .string()
        .required('Bạn phải nhập mật khẩu')
        .min(8, 'Mật khẩu ít nhất có 8 ký tự'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        .required('Bạn phải nhập xác nhận mật khẩu'),
});
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { saveProfile } from '../../store/appSlice';
const ChangePassword = (props) => {
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
        const response = await loginApi.changePassword({phone: profile.phone, oldPassword: data.oldPassword, newPassword: data.newPassword });
        console.log("response: ", response);
        if (response.success) {            
            Toast.show({
                type: 'success',
                text1: response.message
            });
            navigation.navigate("Login");
        }else{
            Toast.show({
                type: 'error',
                text1: response.message
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
                        Đổi mật khẩu
                    </Text>
                </View>
                <View />
            </View>
            <ScrollView style={{ flex: 1, padding: 20 }}>
                {renderInput('Mật khẩu cũ', 'oldPassword', 'Nhập mật khẩu cũ','default', true)}
                {renderInput('Mật khẩu mới', 'newPassword', 'Nhập mật khẩu mới','default', true)}
                {renderInput('Xác nhận mật khẩu', 'confirmPassword', 'Nhập xác nhận mật khẩu','default', true)}
                <View style={{ marginTop: 30, borderRadius: 8, backgroundColor: theme.defaultColor, padding: 10, paddingHorizontal: 15 }} >
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} >
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: "bold" }}>
                            Đổi mật khẩu
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        // </ImageBackground>
    )
}


export default ChangePassword