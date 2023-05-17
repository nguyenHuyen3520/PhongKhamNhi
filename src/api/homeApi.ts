import axiosClient from "./axiosClient";
import fetchQuery from "./fetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const homeApi = {
    getDataHome: () => {
        const url = "/storeViews";
        return axiosClient.get(url)
    },
}

export default homeApi;