import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header'
import { styles } from './style';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import Database from '../../models/Database'
import BackupController from '../../controllers/BackupController';
import LoaderSimple from '../../components/LoaderSimple';
import { SeparatorItem } from '../../components/SeparatorItem';
import Vazio from '../../components/Vazio';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../store/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Backups() {
  const [ backups, setBackups ] = useState(null);
  const { state, dispatch } = useAuth();

  async function atualizarBackups(){
    const backupsArray = [];
    let json;
    const bacs = await BackupController.listAll(1);
    console.log(bacs);
    for(let bac of bacs){
      let data_formatted = dataRecebimento = new Date(bac.data_entrada).toLocaleString().substring(0, 10);
      json = {
        "id": bac.id,
        "tipo": bac.TIPO,
        "data_entrada": data_formatted
      }

      backupsArray.push(json);
    }

    setBackups(backupsArray)
  }

  useEffect(() => {
    openDatabase();
    atualizarBackups();
  }, []);

  async function openDatabase() {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
  }

  async function exportData(){
    const isPossible = await Sharing.isAvailableAsync();
    const url = FileSystem.documentDirectory + 'SQLite/sistex.db';
    if(isPossible){
      await Sharing.shareAsync(url)
    }else{
      console.log("Não é possível enviar dados pelo seu celular!");
    }
  }

  async function importData(){
    console.log("import")
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false
      });

      if (result && result.assets[0].name == 'sistex.db') {
        console.log("entrou");

        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }

        const base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/sistex.db', base64, { encoding: FileSystem.EncodingType.Base64 });
        try{
          Database.closeDb();
          Database.setDb(SQLite.openDatabase('sistex.db'));
          Database.db.transaction(tx => {
            tx.executeSql('SELECT * FROM backup;',
            [],
            (_, {rows}) => console.log(rows),
            (_, e) => (console.log(e))
            )
          })
        }catch(e){
          console.log(e);
        }
        
      } else {
        console.log("Renomeie para 'sistex.db' o nome do arquivo que você está tentando importar.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function delBackup(id){
    console.log("remove backup");
  }

  const Item = ({ item }) => (
    <View style={styles.itemList}>
      <View style={styles.list}>
        <View style={styles.textListPagar}>
          <Text style={styles.textList}>{item.tipo}</Text>
          <Text style={styles.textList}>{item.data_entrada}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => delBackup(item.id)}><Text style={styles.buttonTextLixeira}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Backups</Text>
            </View>
        {state.loading ? (
          <>
            <LoaderSimple />
          </>
        ) : (
            <>
              <FlatList
                ItemSeparatorComponent={SeparatorItem}
                initialNumToRender={50}
                maxToRenderPerBatch={50}
                showsVerticalScrollIndicator={false}
                data={backups}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Vazio text="Nenhum backup encontrado!" />}

              />
            </>
            )}
            <View style={styles.buttonsFinal}>
            <View style={styles.buttons}>
            <TouchableOpacity onPress={exportData} style={styles.button}><Text style={styles.buttonText}>Exportar</Text></TouchableOpacity>
            <TouchableOpacity onPress={importData} style={styles.button}><Text style={styles.buttonText}>Importar</Text></TouchableOpacity>
            </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}