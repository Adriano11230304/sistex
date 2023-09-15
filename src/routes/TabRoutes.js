import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabRoutes() {
    const { state, dispatch } = useAuth();

    return (
        <>
            {state.signed ? (
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Notifications" component={Notifications} />
                    {/*<Tab.Screen name="Contas a pagar" component={Home} />
                    <Tab.Screen name="Contas a receber" component={Home} />
                    <Tab.Screen name="Relatórios" component={Home} />
                    <Tab.Screen name="NFSe" component={Home} />*/}
                </Tab.Navigator>
            ): (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Login" component={Login} />
                </Stack.Navigator>
            )}
        </>
    );
}