import axiosClient from "./axiosClient";
import axios from 'axios';
import fetchQuery from "./fetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';
interface data{
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

interface dataSendOTP{
    phone: string;
}


const loginApi = {
    login: (data: data) => {        
        const url = "/login?phone="+data.phone+"&password="+data.password;
        console.log("api login")
        return fetchQuery(url, 'GET');
    },
    loginAccessToken: (token: string)=>{
        const url = "/loginAccessToken";
        return fetchQuery(url);
    },
    create: (data:dataSignUp)=>{
        console.log("data in create: ", data);
        const url = "/dashboard/createUser";
        return fetchQuery(url, 'POST', data);
        // return axios.post('http://192.168.1.106:4000/api/'+url, {
        //     firstName: 'Finn',
        //     lastName: 'Williams'
        //   })
        //   .then((response) => {
        //     console.log(response);
        //   }, (error) => {
        //     console.log(error);
        //   });

    },
    sendOTP: (data: dataSendOTP)=>{
        const url = "/sendOTP";
        console.log("data: ", data);
        return fetchQuery(url, 'POST' , data);
    }
}

export default loginApi;

