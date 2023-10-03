import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'
import TabRoutes from './TabRoutes';
import { TabRoutesReceber } from './TabRoutes';
import { AntDesign } from '@expo/vector-icons';
import Pagar from '../pages/Pagar';
import Receber from '../pages/Receber';
import Relatorios from '../pages/Relatorios';
import Nfse from '../pages/NFSe';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({ navigation }) {
    const { state } = useAuth();
    const signed = state.signed;
    
    return(
        <Drawer.Navigator screenOptions={{ 
            headerShown: true, 
            drawerInactiveBackgroundColor: '#fff',
            drawerStyle: { backgroundColor: '#fff' },
            headerStyle: { backgroundColor: '#5d8aa8', height: 0, },
            headerStatusBarHeight: 40,
            
            
        }}
        >   
            {/*<Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} name="Login" component={Login} />*/}
            <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} name="Home" component={Home} />
            <Drawer.Screen name="Contas a Pagar" component={Pagar} options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} />
            <Drawer.Screen name="Contas a Receber" component={Receber} options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} />
            <Drawer.Screen name="Emissão de NFSe" component={Nfse} options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} />
            <Drawer.Screen name="Relatórios Financeiros" component={Relatorios} options={{ drawerIcon: ({ color }) => (<AntDesign name="areachart" size={24} color="black" />), }} />
            <Drawer.Screen name="Notifications" component={Notifications} options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} />
        </Drawer.Navigator>
    )
}