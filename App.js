import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import DrawerRoutes from './src/routes/DrawerRoutes';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes/>
      </NavigationContainer>
    </AuthProvider>
  );
}