import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './src/routes/TabRoutes';
import DrawerRoutes from "./src/routes/DrawerRoutes";


export default function App() {
  return (
      <NavigationContainer>
        <DrawerRoutes/>
      </NavigationContainer>
  );
}
