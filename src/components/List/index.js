import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';

export default function List({list, edit, del, add, loading, searchText, setText}) {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Fornecedores</Text>
            </View>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise por um fornecedor"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setText}
                />
                <FontAwesome name="search" size={24} color="black" />
            </View>
            {loading ? (
                <>
                    <LoaderSimple/>
                </>
            ) : (
                <>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={list}
                        renderItem={({ item }) => 
                            <View style={styles.itemList}>
                                <View style={styles.list}>
                                    <Text style={styles.textList}>{item.name}</Text>
                                    <Text style={styles.textList}>{item.cnpj}</Text>
                                </View>
                                <View style={styles.buttons}>
                                    <TouchableOpacity onPress={() => edit(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => del(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                                </View>
                            </View>
                        }
                        keyExtractor={(item) => item.id}
                    />

                    <View style={styles.buttonAdd}>
                        <TouchableOpacity onPress={add}>
                            <AntDesign name="pluscircleo" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
            
        </SafeAreaView>
    );
}