import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/auth';
import TabRoutes from './src/routes/TabRoutes';

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <TabRoutes/>
      </NavigationContainer>
    </AuthProvider>
  );
}