import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetchQuery(url = '', method = 'GET', body = {}) {
    console.log("method: ", method);
    const accessToken = await AsyncStorage.getItem('accessToken');
    let config = {
        method: method.toUpperCase(),
    }
    if (method.toUpperCase() !== "GET") {
        config = {
            ...config,
            headers:{                
                Authorization: accessToken ? accessToken : '',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        }
    }

    console.log("config: ", config);
    return fetch('http://192.168.42.194:4000/api' + url, config)
        .then(response => {
            console.log(response.headers.get('Content-Type'));
            console.log("response: ", response);
            return response.json()
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

export default fetchQuery;