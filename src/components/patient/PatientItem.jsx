import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../configApp';
import { useNavigation } from '@react-navigation/native';
import patientApi from '../../api/patientApi';
import { useDispatch } from 'react-redux';
import { savePatientDetail, savePatients } from '../../store/appSlice';

const PatientItem = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data } = props;    
    const handleSelect = async ()=>{
        const response = await patientApi.changeDefault({id: data.id});        
        console.log("response: ", response)
        if(response.status){            
        
            dispatch(savePatients(response.patients));
            dispatch(savePatientDetail(response.patientDetail[0]));
        }
    }
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("PatientDetail", {
                    info: data
                })
            }}
        >
            <View style={{ margin: 10, borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 5, padding: 10, position: 'relative' }}>
                {
                    data?.is_default == 1 ? (
                        <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: theme.defaultColor, padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                            <Text style={{ color: "white" }}>
                                Mặc Định
                            </Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 10, right: 10, }}
                            onPress={handleSelect}
                        >
                            <View style={{ backgroundColor: theme.defaultColor, padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                <Text style={{ color: "white" }}>
                                    Chọn
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                {
                    data?.name ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="user-circle" style={{ fontSize: 20, marginRight: 10 }} />
                            <Text>
                                {data?.name}
                            </Text>
                        </View>
                    ) : null
                }
                {
                    data?.phone ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                            <MaterialIcons name="smartphone" style={{ fontSize: 20, marginRight: 10 }} />
                            <Text>
                                {data?.phone}
                            </Text>
                        </View>
                    ) : null
                }
                {
                    data?.age ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <MaterialIcons name="cake" style={{ fontSize: 20, marginRight: 10 }} />
                            <Text>
                                {data?.age}
                            </Text>
                        </View>
                    ) : null
                }
                {
                    data?.address ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <FontAwesome5 name="map-marker-alt" style={{ fontSize: 20, marginRight: 10 }} />
                            <Text>
                                {data?.address}
                            </Text>
                        </View>
                    ) : null
                }
            </View>
        </TouchableOpacity>
    )
}

export default PatientItem