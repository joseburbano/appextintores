import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function SenalizacionExtintores() {
  return (
    <ScrollView>
      <View style={styles.espa}>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/senal.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            Se debe indicar en la parte superior derecha de la chapa baliza las
            letras correspondientes a los tipos de fuego para los cuales es apto
            el matafuego ubicado. Las letras deben ser rojas en fondo blanco.
          </Text>
          <Text style={styles.textoPriem}>
            La parte superior de la chapa deber estar ubicada a 1,20 o 1,50
            metros respecto del nivel de piso.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  espa:{
    paddingTop: 100,
  },
  textoPrie: {
    paddingTop: "6%",
    textAlign: "center",
  },
  textoPriem: {
    fontSize: 15,
    textAlign: "justify",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
  tiny: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: "6%",
  },
});
