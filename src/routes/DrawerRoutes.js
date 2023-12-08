import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Login from '../pages/Login';
import { useAuth } from '../store/auth'
import { AntDesign, MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import Relatorios from '../pages/Relatorios';
import Nfse from '../pages/NFSe';
import CredenciaisGoogle from '../pages/CredenciaisGoogle';
import Backups from '../pages/Backups';
import { FornecedorStack, PagarStack, CategoriaStack, ReceitasStack, PagarFixaStack, PagarVariavelStack, ClienteStack } from './Routes';

const Drawer = createDrawerNavigator();

function DrawerRoutes({ navigation }) {
    const { state, dispatch } = useAuth();
    const signed = state.signed;

    return(
        <Drawer.Navigator screenOptions={{ 
            headerShown: signed, 
            drawerInactiveBackgroundColor: '#fff',
            drawerStyle: { backgroundColor: '#fff' },
            headerStyle: { backgroundColor: '#5d8aa8', height: 0, },
            headerStatusBarHeight: 40,  
        }}>
            {signed ? (
                <>
                    <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />), }} name="Home" component={Home} />
                    <Drawer.Screen name="Despesas" component={PagarStack} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="money-off" size={24} color={color} />), }} />
                    <Drawer.Screen name="Despesas Fixas" component={PagarFixaStack} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="money-off" size={24} color={color} />), }} />
                    <Drawer.Screen name="Despesas Variáveis" component={PagarVariavelStack} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="money-off" size={24} color={color} />), }} />
                    <Drawer.Screen name="Receitas" component={ReceitasStack} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="attach-money" size={24} color={color} />), }} />
                    <Drawer.Screen name="Relatórios Financeiros" component={Relatorios} options={{ drawerIcon: ({ color }) => (<AntDesign name="areachart" size={24} color={color} />), }} />
                    <Drawer.Screen name="Clientes" component={ClienteStack} options={{ drawerIcon: ({ color }) => (<AntDesign name="contacts" size={24} color={color} />), }} />
                    <Drawer.Screen name="Fornecedores" component={FornecedorStack} options={{ drawerIcon: ({ color }) => (<Entypo name="v-card" size={24} color={color} />), }} />
                    <Drawer.Screen name="Template de NFSe" component={Nfse} options={{ drawerIcon: ({ color }) => (<Entypo name="direction" size={24} color={color} />), }} />
                    <Drawer.Screen name="Credenciais Google" component={CredenciaisGoogle} options={{ drawerIcon: ({ color }) => (<AntDesign name="google" size={24} color={color} />), }} />
                    <Drawer.Screen name="Backups" component={Backups} options={{ drawerIcon: ({ color }) => (<MaterialIcons name="backup" size={24} color={color} />), }} />
                    <Drawer.Screen name="Categorias" component={CategoriaStack} options={{ drawerIcon: ({ color }) => (<AntDesign name="tago" size={24} color="black" />), }} />
                    <Drawer.Screen name="Notificações" component={Notifications} options={{ drawerIcon: ({ color }) => (<Octicons name="bell" size={24} color={color} />), }} />
                </>
            ) : (
                <>
                    <Drawer.Screen options={{ drawerIcon: ({ color }) => (<AntDesign name="login" size={24} color={color} />), }} name="Login" component={Login} />
                </>
            )}

            
        </Drawer.Navigator>
    )
}

/**/

export default DrawerRoutes;