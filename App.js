import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/Routes'
import DrawerRoutes from "./src/routes/DrawerRoutes";
import { store } from './src/store';
import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";
import sync from "./src/models/sync";

export default function App() {
  const [ routes, setRoutes ] = useState(<AuthStack/>);

  useEffect(() => {
    function teste(){
      console.log(store.getState().user.isLogged);
      if (store.getState().user.isLogged) {
        setRoutes(<DrawerRoutes />)
      } else {
        setRoutes(<AuthStack />);
      }

      console.log(routes);
    }

    teste();
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        {routes}
      </NavigationContainer>
    </Provider>
  );
}
