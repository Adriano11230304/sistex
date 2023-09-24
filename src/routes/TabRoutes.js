import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Pagar from '../pages/Pagar';
import Receber from '../pages/Receber';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Relatorios from '../pages/Relatorios';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Nfse from '../pages/NFSe';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabRoutes() {
    const { state, dispatch } = useAuth();
    // const signed = state.signed;
    const signed = true;

    return (
                <Tab.Navigator 
                activeColor='black'
                inactiveColor='black'
                shifting={false}
                barStyle={{ backgroundColor: '#5d8aa8'}}
                >
                    <Tab.Screen options={{
                        tabBarIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />),
                        tabBarColor: "red"
                        }} name="Home" component={Home} />
                    <Tab.Screen name="Pagar" component={Pagar} />
                    <Tab.Screen name="Receber" component={Receber} />
                    <Tab.Screen name="NFSe" component={Nfse} />
                </Tab.Navigator>
    );
}

export function TabRoutesReceber() {
    const { state, dispatch } = useAuth();
    // const signed = state.signed;
    const signed = true;

    return (
        <Tab.Navigator
            initialRouteName="Receber"
            activeColor='black'
            inactiveColor='black'
            shifting={false}
            barStyle={{ backgroundColor: '#5d8aa8' }}
        >
            <Tab.Screen options={{
                tabBarIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />),
                tabBarColor: "red"
            }} name="Home" component={Home} />
            <Tab.Screen name="Pagar" component={Pagar} />
            <Tab.Screen name="Receber" component={Receber} />
            <Tab.Screen name="NFSe" component={Nfse} />
        </Tab.Navigator>
    );
}