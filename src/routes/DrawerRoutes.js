import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import { styles } from './style';
import { Text, View } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return(
        <Drawer.Navigator initialRouteName="Home" screenOptions={{drawerInactiveBackgroundColor: '#a9a9a9', drawerStyle: {backgroundColor: '#a9a9a9'}}} >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Notifications" component={Notifications} />
        </Drawer.Navigator>

    )
}