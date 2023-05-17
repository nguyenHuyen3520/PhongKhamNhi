import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import loginApi from "../../api/loginApi";
import Toast from 'react-native-toast-message';

const PhoneNumber = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  //  const phoneInput = useRef<PhoneInput>(null);
  const hanldeSendOTP = async () => {
    // console.log("in hanldeSendOTP");
    // const response = await loginApi.sendOTP({ phone: formattedValue });
    // if (response.success) {
    //   navigation.navigate("Register");
    // } else {
    //   Toast.show({
    //     type: 'customError',
    //     props: {
    //       text2: response.message,
    //     },
    //   });
    // }
    navigation.navigate("Register");
  }

  return (
    <>
      <ImageBackground source={require('../../../media/login.jpg')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={styles.wrapper}>
            <View style={{ height: 50, justifyContent: 'center', paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }}>
                <Ionicons name="arrow-back" style={{ fontSize: 22, color: "black" }} />
              </TouchableOpacity>
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
                style={{ textAlign: 'center', borderBottomWidth: 1, width: 300, borderRadius: 5, }}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setFormattedValue(text);
                }}
                returnKeyLabel="Xong"
              />
              <TouchableOpacity
                style={[styles.button, { borderRadius: 99, backgroundColor: formattedValue?.length > 0 ? "#7CDB8A" : "#e0e0e0" }]}
                onPress={() => {
                  hanldeSendOTP()
                }}
                disabled={!formattedValue?.length > 0}
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
