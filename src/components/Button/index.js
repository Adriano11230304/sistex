import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ee7517",
    padding: 10,
    borderRadius: 5,
    width: 90,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Button;