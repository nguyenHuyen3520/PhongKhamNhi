import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation';
import { store } from './src/store'
import { Provider, useDispatch } from 'react-redux'
import LoadingComponent from './src/components/Loading';
import toastConfig from './src/components/Toast'
import Toast from 'react-native-toast-message';
import NotificationPop from './src/components/Notification';
const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <LoadingComponent />
        {/* <NotificationPop /> */}
        <Toast
        // config={toastConfig} 
        />
      </NavigationContainer>
    </Provider>
  )
}

export default App