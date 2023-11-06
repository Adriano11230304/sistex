import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

export async function saveCategorias(){
    const categorias = [
        {
            "titulo": "supermercado",
            // "icone": <AntDesign name="shoppingcart" size={24} color="black" />
            "icone": "teste"
        },
        {
            "titulo": "comida",
            // "icone": <MaterialCommunityIcons name='food-turkey' size={24} color='black' />
            "icone": "testando"
            
        }
    ]
    try{
        const jsonCategorias = JSON.stringify(categorias)
        await AsyncStorage.setItem('categorias', jsonCategorias)
    }catch(e){
        console.log(e);
    }
}

export async function getCategorias(){
    try{
        const value =  await AsyncStorage.getItem('categorias');
        if(value != null){
            return value;
        }else{
            return 'Não existem categorias salvas!';
        }

    }catch(e){
        return e;
    }
}