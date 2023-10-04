import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './styles';


const countries = ["Outubro/2023", "Novembro/2023", "Dezembro/2023"]

const SelectHome = () => {
    return (
        <SelectDropdown buttonStyle={styles.container} defaultValue={"Outubro/2023"}
            data={countries}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
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
