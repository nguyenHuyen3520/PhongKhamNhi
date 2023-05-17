import axiosClient from "./axiosClient";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const patientApi = {
    createPatient: (data:any) => {        
        const url = "/create-patient";
        return axiosClient.post(url, data);
    },
    updatePatient: (data:any) => {        
        const url = "/update-patient";
        return axiosClient.put(url, data);
    },
    changeDefault: (data: any)=>{
        const url = "/change-patient-detail";
        return axiosClient.put(url, data);
    },
    getCalendar: (data:any)=>{
        const url = "/create-calendar";
        return axiosClient.post(url, data);
    },
    createSchedule: (data:any)=>{
        const url = "/create-schedule";
        return axiosClient.post(url, data);
    },
    
}

export default patientApi;