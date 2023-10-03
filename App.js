import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import DrawerRoutes from './src/routes/DrawerRoutes';
import TabRoutes from './src/routes/TabRoutes';
import { View, Text } from 'react-native';
import Login from './src/pages/Login';

// credenciais android 
// id do cliente 1099078308735-7ak00a0clhai3m0bs4d4qccrduljif4u.apps.googleusercontent.com
// chave SHA1 C6:36:DA:CB:FF:AF:60:BB:9E:5D:06:F1:79:E8:64:96:5D:6E:B8:45

export default function App() {
  
  return (
    /*<Login/>*/
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
  </AuthProvider>
  );
}