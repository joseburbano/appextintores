import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Categoria from "../components/Categoria/Categoria";
import Colores from "../styles/Colors";

export default function Home() {
  return (
    <View style={styles.ini}>
      <Text style={styles.titulo}>INFORMACIÓN</Text>
      <View style={styles.contatiners}>
        <Text style={styles.textCate}>Categorias</Text>
      </View>
      <Categoria />
    </View>
  );
}

const styles = StyleSheet.create({
  ini:{
    paddingTop: 10,
  },
  titulo: {
    paddingTop: "23%",
    padding: "6%",
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  contatiners: {
    paddingTop: "3%",
    backgroundColor: Colores.GREEN,
  },
  textCate: {
    fontSize: 26,
    color: Colores.WHITE,
  },
});
