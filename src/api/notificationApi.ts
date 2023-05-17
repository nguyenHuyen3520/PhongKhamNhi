import axiosClient from "./axiosClient";
import fetchQuery from "./fetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const notificationApi = {
    readAll: (data:any) => {        
        const url = "/read-all-notification";
        return fetchQuery(url,'POST', data);
    },
    
}

export default notificationApi;