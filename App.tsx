import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation';
import { store } from './src/store'
import { Provider } from 'react-redux'
import LoadingComponent from './src/components/Loading';
import toastConfig from './src/components/Toast'
import Toast from 'react-native-toast-message';

const App = () => {
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