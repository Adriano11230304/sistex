import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './styles';

const SelectHome = () => {
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3,10);
    const countries = ["01/2023","02/2023","03/2023","04/2023","05/2023","06/2023","07/2023","08/2023","09/2023","10/2023", "11/2023", "12/2023","01/2024","02/2024","03/2024","04/2024","05/2024","06/2024","07/2024","08/2024","09/2024","10/2024","11/2024","12/2024","01/2025","02/2025","03/2025","04/2025","05/2025","06/2025","07/2025","08/2025","09/2025","10/2025","11/2025","12/2025","01/2026","02/2026","03/2026","04/2026","05/2026","06/2026","07/2026","08/2026","09/2026","10/2026","11/2026","12/2026","01/2027","02/2027","03/2027","04/2027","05/2027","06/2027","07/2027","08/2027","09/2027","10/2027","11/2027","12/2027","01/2028","02/2028","03/2028","04/2028","05/2028","06/2028","07/2028","08/2028","09/2028","10/2028","11/2028","12/2028","01/2029","02/2029","03/2029","04/2029","05/2029","06/2029","07/2029","08/2029","09/2029","10/2029","11/2029","12/2029","01/2030","02/2030","03/2030","04/2030","05/2030","06/2030","07/2030","08/2030","09/2030","10/2030","11/2030","12/2030"]
    let defaultValue;
    countries.map(count => {
        if(dataatual == count){
            defaultValue = dataatual
        }
    })

    return (
        <SelectDropdown buttonStyle={styles.container} defaultValue={defaultValue}
            data={countries}
            onSelect={(selectedItem, index) => {
                console.log("csdcscsdc");
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
        />
    )
}


export default SelectHome;
