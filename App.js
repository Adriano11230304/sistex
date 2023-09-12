import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/Routes';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { AuthProvider, useAuth } from './src/store/auth';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes/>
      </NavigationContainer>
    </AuthProvider>
  );
}