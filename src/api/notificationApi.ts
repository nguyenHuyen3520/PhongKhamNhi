import axiosClient from "./axiosClient";
import fetchQuery from "./fetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const notificationApi = {
    readAll: (data:any) => {        
        const url = "/read-all-notification";
        return axiosClient.post(url,data);
    },
    
}

export default notificationApi;