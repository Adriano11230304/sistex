import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import { store } from '../store'
import Login from '../pages/Login';
import { useEffect, useState, useMemo } from 'react';

const Drawer = createDrawerNavigator();



export default function DrawerRoutes({ navigation }) {
    const [ routes, setRoutes ] = useState(<Drawer.Screen name="Login" component={Login} />)

    
    return(
            <Drawer.Navigator screenOptions={{ drawerInactiveBackgroundColor: '#a9a9a9', drawerStyle: { backgroundColor: '#a9a9a9' } }} >
                {routes}
            </Drawer.Navigator>

    )
}