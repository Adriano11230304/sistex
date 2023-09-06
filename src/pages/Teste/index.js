import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import Button from "../../components/Button";

import { useSelector, useDispatch } from "react-redux";
import {logado, naoLogado } from "../../store/actions";
import { styles } from "./styles";

const Teste = () => {
  const { user, loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>sdcsdcsdcsd</Text>
    </View>
  );
};

export default Teste;