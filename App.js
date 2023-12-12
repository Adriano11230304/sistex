import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import DrawerRoutes from './src/routes/DrawerRoutes';
import Database from './src/models/Database';
import * as Notify from 'expo-notifications';

export default function App() {

  Notify.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}