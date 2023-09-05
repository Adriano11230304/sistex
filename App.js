import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/routes/Routes'
import DrawerRoutes from "./src/routes/DrawerRoutes";


export default function App() {
  return (
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>
  );
}
