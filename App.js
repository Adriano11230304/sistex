import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import DrawerRoutes from './src/routes/DrawerRoutes';
import TabRoutes from './src/routes/TabRoutes';
import { View, Text } from 'react-native';
import Login from './src/pages/Login';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}