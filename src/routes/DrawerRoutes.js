import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'

const Drawer = createDrawerNavigator();



export default function DrawerRoutes({ navigation }) {
    const {
        state: { signed },
    } = useAuth();
    
    return(
        <Drawer.Navigator screenOptions={{ headerShown: signed, drawerInactiveBackgroundColor: '#a9a9a9', drawerStyle: { backgroundColor: '#fff' } }} >
            {signed ? (
                <>
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Notifications" component={Notifications} />
                </>
            ) : (
                <>
                    <Drawer.Screen name="Login" component={Login} />
                </>
            )}
            </Drawer.Navigator>

    )
}