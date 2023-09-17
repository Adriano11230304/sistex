import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'
import TabRoutes from './TabRoutes';
import { AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

// colocar em toda a view um botão para opendrawer

export default function DrawerRoutes({ navigation }) {
    const { state } = useAuth();
    // const signed = state.signed;
    const signed = true;
    
    return(
        <Drawer.Navigator screenOptions={{ headerShown: true, drawerInactiveBackgroundColor: '#a9a9a9', drawerStyle: { backgroundColor: '#fff' } }} >
            {signed ? (
                <>
                    
                    <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} name="Home" component={Home} />
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