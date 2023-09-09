import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/Routes'
import DrawerRoutes from "./src/routes/DrawerRoutes";
import { store } from './src/store';
import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";
import sync from "./src/models/sync";

export default function App() {
  // Não vai dar de fazer porque o App é carregado uma vez só - testar middlewares;

  return (
      <NavigationContainer>
        <Provider store={store}>
          <DrawerRoutes/>
        </Provider>
      </NavigationContainer>
  );
}
