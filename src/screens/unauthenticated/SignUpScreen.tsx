import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import loginApi from '../../api/loginApi';
import fetchQuery from '../../api/fetchApi';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';
import { changeLoading } from '../../store/appSlice';
const schema = yup.object().shape({
    email: yup.string().email().required('Không thể đổ trống trường này'),
    first_name: yup.string().required('Không thể đổ trống trường này'),
    last_name: yup.string().required('Không thể đổ trống trường này'),
    password: yup.string().min(8).max(32).required('Không thể đổ trống trường này'),
    passwordConfirmation: yup.string().required('Không thể đổ trống trường này')
        .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng nhau').min(8)
});

interface dataSignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const SignUpScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: dataSignUp) => {
        console.log("in onSubmit");
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user: ",user.uid);
                const newData = {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    chat_id: user.uid
                }
                dispatch(changeLoading(true));
                const result = await loginApi.create(newData);
                if (result.success) {
                    dispatch(changeLoading(false));
                    Toast.show({
                        type: 'customSuccess',
                        props: {
                            text2: 'Đăng ký tài khoản mới thành công!',
                        },
                    });
                    navigation.goBack();
                }                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        
    };
    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} >
            <View style={{ position: 'relative', width: Dimensions.get('window').width, height: Dimensions.get("window").height - 28 }}>
                <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Đăng ký tài khoản
                        </Text>
                    </View>
                    <View />
                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10 }}>
                            Họ:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={{ borderWidth: 1, width: 400, borderRadius: 5, paddingHorizontal: 10 }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="first_name"
                        />
                        {errors.first_name && <Text style={{ color: 'red' }}>{errors.first_name.message}.</Text>}
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10 }}>
                            Tên:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={{ borderWidth: 1, width: 400, borderRadius: 5, paddingHorizontal: 10 }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="last_name"
                        />
                        {errors.last_name && <Text style={{ color: 'red' }}>{errors.last_name.message}.</Text>}
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ marginBottom: 10 }}>
                            Email:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={{ borderWidth: 1, width: 400, borderRadius: 5, paddingHorizontal: 10 }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="email"
                        />
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}.</Text>}
                    </View>
                    <View>
                        <Text style={{ marginBottom: 10 }}>
                            Mật khẩu:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={{ borderWidth: 1, width: 400, borderRadius: 5, paddingHorizontal: 10 }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={true}
                                />
                            )}
                            name="password"
                        />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}.</Text>}
                    </View>
                    <View>
                        <Text style={{ marginBottom: 10 }}>
                            Nhập lại mật khẩu:
                        </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={{ borderWidth: 1, width: 400, borderRadius: 5, paddingHorizontal: 10 }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={true}
                                />
                            )}
                            name="passwordConfirmation"
                        />
                        {errors.passwordConfirmation && <Text style={{ color: 'red' }}>{errors.passwordConfirmation.message}.</Text>}
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0994f1' }}>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                        <View style={{}}>
                            <Text style={{ color: 'white' }}>
                                Đăng Ký
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignUpScreen