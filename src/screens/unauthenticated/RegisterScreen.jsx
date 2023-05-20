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
  password: yup
    .string()
    .required('Bạn phải nhập mật khẩu')
    .min(8, 'Mật khẩu ít nhất có 8 ký tự'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Bạn phải nhập xác nhận mật khẩu'),
});
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../configApp';
const RegisterScreen = (props) => {
  const { navigation } = props;
  const { phone = '' } = props.route.params;  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      address: data.address,
      password: data.password,
      description: 'a',
      status: 1,
      role_id: 3,
      phone: phone,
    }
    const response = await loginApi.create(formData);
    if (response.success) {
      navigation.navigate("Login");
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
            Đăng ký tài khoản
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
        {renderInput('Email', 'email', 'Nhập email')}
        {renderInput('Địa chỉ', 'address', 'Nhập địa chỉ')}
        {renderInput('Mật khẩu', 'password', 'Nhập mật khẩu', 'default', true)}
        {renderInput('Xác nhận mật khẩu', 'confirmPassword', 'Nhập xác nhận mật khẩu', 'default', true)}
        <View style={{ marginTop: 30, borderRadius: 8, backgroundColor: theme.defaultColor, padding: 10, paddingHorizontal: 15 }} >
          <TouchableOpacity onPress={handleSubmit(onSubmit)} >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: "bold" }}>
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    // </ImageBackground>
  )
}

export default RegisterScreen