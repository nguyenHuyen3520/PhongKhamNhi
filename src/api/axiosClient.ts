import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface customHeadersType{
    Authorization: string
}

const axiosClient = axios.create({
    baseURL: 'http://192.168.2.102:4000/api',
    headers: {
        'content-type': 'application/json',
    },
});
axiosClient.interceptors.request.use(async (config) => {
    console.log("config: ", config);
    const customHeaders:customHeadersType = {Authorization: ''};    
    const accessToken = await AsyncStorage.getItem('accessToken');  

    if (accessToken) {
        console.log("accessToken: ", accessToken);
        customHeaders.Authorization = accessToken;
    }

    return {
        ...config,
        headers: {
            ...customHeaders,  // auto attach token
            ...config.headers, // but you can override for some requests
        }
    };
});
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;


// import axios from 'axios';
// // import queryString from 'query-string';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const axiosClient = axios.create({
//     baseURL: 'http://192.168.42.194:4000/api',
//     headers: {
//         'content-type': 'application/json',
//     },
// });
// axiosClient.interceptors.request.use(async (config) => {
//     const customHeaders = { Authorization: '' };
//     const accessToken = await AsyncStorage.getItem('accessToken');    
//     if (accessToken) {
//         customHeaders.Authorization = accessToken;
//     }

//     return {
//         ...config,
//         headers: {
//             ...customHeaders,  // auto attach token
//             ...config.headers, // but you can override for some requests
//         }
//     };
// });
// axiosClient.interceptors.response.use((response) => {
//     if (response && response.data) {
//         return response.data;
//     }
//     return response;
// }, (error) => {
//     // Handle errors
//     throw error;
// });

// const axiosClient = {
//     get: (url: string) => {
//         fetch('http://192.168.42.194:4000/api/' + url, {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json',
//                 // 'Authorization': accessToken ? accessToken : ''
//             },
//         })
//             .then(response => {
//                 console.log("response: ", response.json());
//                 return response.json();
//             })
//     },
//     post: async (url: string, data: any) => {

//     },
//     put: async (url: string, data: any) => {

//     }
// }

// export default axiosClient;