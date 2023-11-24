import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header'
import { styles } from './style';
import { Text, View, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import Database from '../../models/Database'

export default function Backups() {
  useEffect(() => {
    openDatabase();
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
            tx.executeSql('SELECT * FROM users;',
            [],
            (_, {rows}) => console.log("rows", rows),
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

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Backups</Text>
            </View>     
            <View style={styles.buttons}>
            <TouchableOpacity onPress={exportData} style={styles.button}><Text style={styles.buttonText}>Exportar</Text></TouchableOpacity>
            <TouchableOpacity onPress={importData} style={styles.button}><Text style={styles.buttonText}>Importar</Text></TouchableOpacity>
            </View>
        <View style={styles.information}><Text style={styles.textInformation}>Faça as importações e exportações para o seu Google Drive para um funcionamento mais rápido da ferramenta.</Text></View>
            <StatusBar style="auto" />
        </View>
    );
}