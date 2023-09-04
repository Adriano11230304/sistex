import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Notifications" component={Notifications} />
        </Drawer.Navigator>
    )
}