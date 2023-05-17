import axiosClient from "./axiosClient";
import axios from 'axios';
import fetchQuery from "./fetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';
interface data {
    phone: string;
    password: string;
}
interface dataSignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    chat_id: string;
}

interface dataSendOTP {
    phone: string;
}


const loginApi = {
    login: (data: data) => {
        const url = "/login?phone=" + data.phone + "&password=" + data.password;
        console.log("api login", url);
        return axiosClient.get(url);
    },
    loginAccessToken: (token: string) => {
        const url = "/loginAccessToken";
        return axiosClient.get(url);
    },
    create: (data: dataSignUp) => {
        console.log("data in create: ", data);
        const url = "/dashboard/createUser";
        return axiosClient.post(url, data);
    },
    sendOTP: (data: dataSendOTP) => {
        const url = "/sendOTP";
        console.log("data: ", data);
        return axiosClient.post(url, data);
    },
    validateOTP: (data: any) => {
        const url = "/validateOTP";        
        return axiosClient.post(url, data);
    },    
    getInfo: ()=>{
        const url = '/getInfo';
        return axiosClient.get(url);
    }
}

export default loginApi;

