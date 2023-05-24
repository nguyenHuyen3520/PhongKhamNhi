import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation';
import { store } from './src/store'
import { Provider } from 'react-redux'
import LoadingComponent from './src/components/Loading';
import toastConfig from './src/components/Toast'
import Toast from 'react-native-toast-message';
import OneSignal from 'react-native-onesignal';
const App = () => {
  useEffect(() => {
    OneSignal.setAppId("5f576173-d203-4d68-88c2-ece066b602c0");
    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, [])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <LoadingComponent />
        <Toast
        // config={toastConfig} 
        />
      </NavigationContainer>
    </Provider>
  )
}

export default App