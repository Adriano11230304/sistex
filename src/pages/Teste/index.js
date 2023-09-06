import React from "react";
import { ActivityIndicator, Modal, Text, View, TextInput } from "react-native";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { user, store } from "../../store";
import { styles } from "./styles";

const Teste = () => {
  const { user, loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TextInput style={styles.text}>sdcsdcsdcsd</TextInput>
      <Button title={"Pressione"}/>
    </View>
  );
};

export default Teste;