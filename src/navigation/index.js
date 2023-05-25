import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '@theme';
import Splash from '../screens/authentication/Splash';
import LoginScreen from '../screens/unauthenticated/LoginScreen';
import PhoneNumber from '../screens/unauthenticated/PhoneNumberScreen';
import RegisterScreen from '../screens/unauthenticated/RegisterScreen';
import Account from '../screens/authentication/Account';
import Notification from '../screens/authentication/Notification';
import Bills from '../screens/authentication/Bills';
import Patients from '../screens/authentication/Patients';
import Home from './../screens/authentication/Home';
import CreatePatient from '../screens/authentication/CreatePatient';
import PatientDetail from '../screens/authentication/PatientDetail';
import Booking from '../screens/authentication/Booking';
import Doctors from '../screens/authentication/Doctors';
import Services from '../screens/authentication/Services';
import Calendar from '../screens/authentication/Calendar';
import Time from '../screens/authentication/Time';
import { useDispatch, useSelector } from 'react-redux';
import ValidateOtpScreen from '../screens/unauthenticated/ValidateOtpScreen';
import MyInfoScreen from '../screens/authentication/MyInfo';
import ChangePassword from '../screens/authentication/ChangePassword';
import TreatmentHistory from '../screens/authentication/TreatmentHistory';
import PostDetail from '../screens/authentication/PostDetail';
import OneSignal from 'react-native-onesignal';
import { saveNotifications } from '../store/appSlice';
import BookingDetail from '../screens/authentication/BookingDetail';


const Stack = createNativeStackNavigator();
const options = {
    headerShown: false,
}

const Tab = createBottomTabNavigator();

function BottomTabs() {
    const notifications = useSelector((state) => state.app.notifications);
    const tabBarBadge = useMemo(() => {
        return notifications && notifications?.length > 0 ? notifications.filter((item) => item.status == 1)?.length : 0;
    }, [notifications])
    return (
        <Tab.Navigator
            // initialRouteName="Trang chủ"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Trang chủ') {
                        iconName = focused
                        //   ? 'ios-information-circle'
                        //   : 'ios-information-circle-outline';

                        return <Entypo name="home" size={size} color={color} />;
                    } else if (route.name === 'Hồ sơ') {
                        return <AntDesign name="folderopen" size={size} color={color} />;
                    } else if (route.name === 'Phiếu khám') {
                        return <AntDesign name="file1" size={size} color={color} />;
                    } else if (route.name === 'Thông báo') {
                        return <Ionicons name="md-notifications-outline" size={size} color={color} />;
                    } else {
                        return <MaterialIcons name="account-circle" size={size} color={color} />;
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.defaultColor,
                tabBarInactiveTintColor: 'gray',
            })}

        >
            <Tab.Screen name="Trang chủ" component={Home} options={options} />
            <Tab.Screen name="Hồ sơ" component={Patients} options={options} />
            <Tab.Screen name="Phiếu khám" component={Bills}
                options={options}
            />
            {/* <Tab.Screen name="Thông báo" component={Notification} options={tabBarBadge > 0 ? {
                tabBarBadge: tabBarBadge,
                headerShown: false,
            } : {
                headerShown: false,
            }
            } /> */}
            <Tab.Screen name="Tài khoản" component={Account} options={options} />
        </Tab.Navigator>
    );
}
const AppNavigation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        OneSignal.setAppId("5f576173-d203-4d68-88c2-ece066b602c0");
        // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
        // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
        OneSignal.promptForPushNotificationsWithUserResponse();

        //Method for handling notifications received while app in foreground
        OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
            let notification = notificationReceivedEvent.getNotification();
            setTimeout(() => {
                dispatch(saveNotifications(notification));
            }, 3000);
            // Complete with null means don't show a notification.
            notificationReceivedEvent.complete(notification);
        });

        //Method for handling notifications opened
        OneSignal.setNotificationOpenedHandler(notification => {
            setTimeout(() => {
                dispatch(saveNotifications(notification));
            }, 3000);

        });
    }, [])
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={options} />
            <Stack.Screen name="Splash" component={Splash} options={options} />
            <Stack.Screen name="BottomTab" component={BottomTabs} options={options} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={options} />
            <Stack.Screen name="MyInfoScreen" component={MyInfoScreen} options={options} />
            <Stack.Screen name="Register" component={RegisterScreen} options={options} />
            <Stack.Screen name="CreatePatient" component={CreatePatient} options={options} />
            <Stack.Screen name="PatientDetail" component={PatientDetail} options={options} />
            <Stack.Screen name="Booking" component={Booking} options={options} />
            <Stack.Screen name="Doctors" component={Doctors} options={options} />
            <Stack.Screen name="Services" component={Services} options={options} />
            <Stack.Screen name="Calendar" component={Calendar} options={options} />
            <Stack.Screen name="Time" component={Time} options={options} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={options} />
            <Stack.Screen name="ValidateOtpScreen" component={ValidateOtpScreen} options={options} />
            <Stack.Screen name="TreatmentHistory" component={TreatmentHistory} options={options} />
            <Stack.Screen name="PostDetail" component={PostDetail} options={options} />
            <Stack.Screen name="BookingDetail" component={BookingDetail} options={options} />
        </Stack.Navigator>
    )
}

export default AppNavigation




