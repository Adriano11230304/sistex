import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { AuthProvider } from './src/store/auth';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes/>
      </NavigationContainer>
    </AuthProvider>
  );
}