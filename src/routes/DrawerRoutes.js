import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'
import TabRoutes from './TabRoutes';
import { TabRoutesReceber } from './TabRoutes';
import { AntDesign, MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import Pagar from '../pages/Pagar';
import Receber from '../pages/Receber';
import Relatorios from '../pages/Relatorios';
import Nfse from '../pages/NFSe';

const Drawer = createDrawerNavigator();

async function DrawerRoutes({ navigation }) {
    const signed = true;
    return(
        <Drawer.Navigator screenOptions={{ 
            headerShown: signed, 
            drawerInactiveBackgroundColor: '#fff',
            drawerStyle: { backgroundColor: '#fff' },
            headerStyle: { backgroundColor: '#5d8aa8', height: 0, },
            headerStatusBarHeight: 40,
            
            
        }}
        >
            <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="login" size={24} color={color} />), }} name="Login" component={Login} />
            
        </Drawer.Navigator>
    )
}

/*{signed ? (
    <>
        <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} name="Home" component={Home} />
        <Drawer.Screen name="Contas a Pagar" component={Pagar} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="money-off" size={24} color={color} />), }} />
        <Drawer.Screen name="Contas a Receber" component={Receber} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="attach-money" size={24} color={color} />), }} />
        <Drawer.Screen name="Emissão de NFSe" component={Nfse} options={{ drawerIcon: ({ color }) => (<Entypo name="direction" size={24} color={color} />), }} />
        <Drawer.Screen name="Relatórios Financeiros" component={Relatorios} options={{ drawerIcon: ({ color }) => (<AntDesign name="areachart" size={24} color={color} />), }} />
        <Drawer.Screen name="Notifications" component={Notifications} options={{ drawerIcon: ({ color }) => (<Octicons name="bell" size={24} color={color} />), }} />
    </>
) : (
    <>
        <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="login" size={24} color={color} />), }} name="Login" component={Login} />
    </>
)}*/

export default DrawerRoutes;