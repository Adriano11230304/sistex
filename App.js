import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/Routes'
import DrawerRoutes from "./src/routes/DrawerRoutes";
import { store } from './src/store';
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import sync from "./src/models/sync";

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
    </Provider>
  );
}
