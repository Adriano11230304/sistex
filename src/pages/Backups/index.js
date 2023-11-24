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
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Backups() {
  const [ backups, setBackups ] = useState(null);
  const { state, dispatch } = useAuth();
  const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(false);
    const [nexPage, setNexPage] = useState(false);

  async function atualizarBackups(){
    const backupsArray = [];
    let json;
    const bacs = await BackupController.listAll(page);
    console.log("bacs", await BackupController.listAll(1));
    const bacNext = await BackupController.listAll(page + 1);
    console.log(page);
    console.log("bac", bacNext);
    console.log("todos", await BackupController.listAllAll());
        const bacPrev = await BackupController.listAll(page - 1);
        if (bacNext.length > 0) {
            setNexPage(true);
        } else {
            setNexPage(false);
        }
        console.log("next", nexPage);

        if (bacPrev.length > 0) {
            setPrevPage(true);
        } else {
            setPrevPage(false);
        }
    for(let bac of bacs){
      let data_formatted = dataRecebimento = new Date(bac.data_entrada).toLocaleString().substring(0, 10);
      json = {
        "id": bac.id,
        "tipo": bac.tipo,
        "data_entrada": data_formatted
      }

      backupsArray.push(json);
    }

    setBackups(backupsArray)
  }

  useEffect(() => {
    openDatabase();
    atualizarBackups();
  }, [page]);

  async function nextPage(){
    setPage(page + 1);
}

async function previousPage(){
    setPage(page - 1);
}

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
      const saveBackup = await BackupController.add("exportação", Date.now());
      atualizarBackups();
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
            (_, {rows}) => console.log("rows", rows),
            (_, e) => (console.log(e))
            )
          })

          const saveBackup = await BackupController.add("importação", Date.now());
          atualizarBackups();
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
    const del = await BackupController.remove(id);
    await atualizarBackups()
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
                          <View style={styles.pagesNext}>
                            {prevPage &&
                                <>
                                    <View>
                                        <TouchableOpacity onPress={async () => { await previousPage() }}>
                                            <AntDesign name="leftcircleo" size={40} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }

                            {nexPage &&
                                <View style={styles.buttonAdd}>
                                    <TouchableOpacity onPress={async () => { await nextPage() }}>
                                        <AntDesign name="rightcircleo" size={40} color="black" />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
            <View style={styles.buttons}>
            <TouchableOpacity onPress={exportData} style={styles.button}><Text style={styles.buttonText}>Exportar</Text></TouchableOpacity>
            <TouchableOpacity onPress={importData} style={styles.button}><Text style={styles.buttonText}>Importar</Text></TouchableOpacity>
            </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}