import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import DrawerRoutes from './src/routes/DrawerRoutes';
import TabRoutes from './src/routes/TabRoutes';
import sync from './src/models/sync';
import User from './src/models/User';

export default function App() {

  
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}