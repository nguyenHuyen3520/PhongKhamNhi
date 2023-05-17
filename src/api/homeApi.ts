import axiosClient from "./axiosClient";
import fetchQuery from "./fetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const homeApi = {
    getDataHome: () => {
        const url = "/test";
        return fetchQuery(url)
    },
}

export default homeApi;