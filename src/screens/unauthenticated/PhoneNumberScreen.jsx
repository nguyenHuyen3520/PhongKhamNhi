import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  Alert,
  Modal,
  Dimensions
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import loginApi from "../../api/loginApi";
import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/appSlice";
import theme from "../../configApp";

const PhoneNumber = ({ navigation }) => {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [code, setCode] = useState("");
  //  const phoneInput = useRef<PhoneInput>(null);

  const handleValidate = async () => {
    dispatch(setLoading(true));
    console.log("data validate: ", { code, request_id: requestId });
    const response = await loginApi.validateOTP({ code, request_id: requestId });
    if (response.success) {
      Toast.show({
        type: 'success',
        text1: "Xác thực mã thành công",
      });
      setModalVisible(false);
      dispatch(setLoading(false));  
      navigation.navigate("Register", { phone: formattedValue });
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }
    dispatch(setLoading(false));
  }

  const hanldeSendOTP = async () => {
    dispatch(setLoading(true));
    const response = await loginApi.sendOTP({ phone: formattedValue });
    if (response.success) {
      Toast.show({
        type: 'success',
        text1: "Gửi mã xác thực thành công",
      });
      setModalVisible(true);
      setRequestId(response.request_id);
    } else {
      Toast.show({
        type: 'error',
        text1: response.message,
      });
    }
    dispatch(setLoading(false));
    // navigation.navigate("Register");
  }

  return (
    <>
      <ImageBackground source={require('../../../media/login.jpg')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.centeredView, { position: 'relative', flex: 1 }]}>
            <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, position: 'absolute', top: 0, right: 0, left: 0, backgroundColor: 'black', zIndex: 99, opacity: 0.3 }} />
            <View style={[styles.modalView, { zIndex: 100 }]}>
              <View style={{ padding: 35, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginVertical: 5 }}>
                  Xác thực OTP
                </Text>
                <Text style={{ textAlign: 'center', marginVertical: 5 }}>
                  Vui lòng nhập mã OTP sẽ được gửi về SDT {formattedValue} trong vài phút để đăng ký tài khoản.
                </Text>
                <View style={{ marginVertical: 10 }}>
                  <TextInput
                    placeholder={"******"}
                    style={{ textAlign: 'center', borderBottomWidth: 1, width: 200, }}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setCode(text);
                    }}
                    returnKeyLabel="Xong"
                  />
                </View>
                <TouchableOpacity>
                  <View style={{ borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                      Gửi lại
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#e0e0e0', padding: 15 }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(false);
                  }}>
                    <Text>
                      Bỏ qua
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#e0e0e0', padding: 15, borderLeftWidth: 1, borderLeftColor: '#e0e0e0', }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleValidate();
                    }}
                    disabled={code.length == 0}
                  >
                    <Text style={{ color: code.length == 0 ? '#e0e0e0' : "black" }}>
                      Xác nhận
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        </Modal>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={styles.wrapper}>
            <View style={{ height: 55, backgroundColor: theme.defaultColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }}>
                <Ionicons name="arrow-back" style={{ color: "white", fontSize: 22 }} />
              </TouchableOpacity>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                  Đăng ký tài khoản
                </Text>
              </View>
              <View />
            </View>
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: 'white'
            }}>
              <View style={{ ...styles.welcome, fontWeight: "bold" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Phòng khám nhi H</Text>
              </View>
              <View style={styles.welcome}>
                <Text style={{ fontSize: 16 }}>Vui lòng nhập số điện thoại để tiếp tục</Text>
              </View>
              <TextInput
                placeholder={"Nhập số điện thoại"}
                style={{ textAlign: 'center', borderBottomWidth: 1, width: 300 }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setFormattedValue(text);
                }}
                returnKeyLabel="Xong"
              />
              <TouchableOpacity
                style={[styles.button, { borderRadius: 99, backgroundColor: formattedValue?.length > 8 ? theme.defaultColor : "#e0e0e0" }]}
                onPress={() => {
                  hanldeSendOTP()
                }}
                disabled={!formattedValue?.length > 8}
              >
                <Text style={[styles.buttonText, { fontWeight: "bold", fontSize: 18, }]}>TIẾP TỤC</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: Dimensions.get("window").width * 0.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },

  wrapper: {
    flex: 1,

  },

  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7CDB8A",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
  },

  welcome: {
    padding: 20,
  },

  status: {
    padding: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    color: "gray",
  },
});

export default PhoneNumber;
