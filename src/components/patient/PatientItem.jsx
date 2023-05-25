import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../configApp';
import { useNavigation } from '@react-navigation/native';
import patientApi from '../../api/patientApi';
import { useDispatch } from 'react-redux';
import { savePatientDetail, savePatients, setLoading } from '../../store/appSlice';
import ButtonScale from '../Button/ButtonScale';
import Toast from 'react-native-toast-message';

const PatientItem = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data } = props;
    const handleSelect = async () => {
        dispatch(setLoading(true));
        const response = await patientApi.changeDefault({ id: data.id });
        if (response.success) {
            Toast.show({
                type: 'success',
                text1: "Thay đổi hồ sơ mặc định thành công"
            });
            dispatch(savePatients(response?.patients));
            dispatch(savePatientDetail(response?.patientDetail));
            dispatch(setLoading(false));
        }
    }
    return (
        <View style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        }}>
            <ButtonScale
                onPress={() => {
                    navigation.navigate("PatientDetail", {
                        info: data
                    })
                }}
            >
                <View style={{
                    margin: 15, marginVertical: 10, borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 12, padding: 15, position: 'relative',

                }}>
                    {
                        data?.is_default == 1 ? (
                            <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: theme.defaultColor, padding: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                <Text style={{ color: "white" }}>
                                    Mặc Định
                                </Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 15, right: 15, zIndex: 99 }}
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <FontAwesome5 name="user-circle" style={{ fontSize: 20, marginRight: 10 }} />
                                <Text>
                                    {data?.name}
                                </Text>
                            </View>
                        ) : null
                    }
                    {
                        data?.phone ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>

                                <MaterialIcons name="smartphone" style={{ fontSize: 20, marginRight: 10 }} />
                                <Text>
                                    {data?.phone}
                                </Text>
                            </View>
                        ) : null
                    }
                    {
                        data?.age ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <MaterialIcons name="cake" style={{ fontSize: 20, marginRight: 10 }} />
                                <Text>
                                    {data?.age}
                                </Text>
                            </View>
                        ) : null
                    }
                    {
                        data?.address ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <FontAwesome5 name="map-marker-alt" style={{ fontSize: 20, marginRight: 10 }} />
                                <Text>
                                    {data?.address}
                                </Text>
                            </View>
                        ) : null
                    }
                </View>
            </ButtonScale>
        </View>
    )
}

export default PatientItem