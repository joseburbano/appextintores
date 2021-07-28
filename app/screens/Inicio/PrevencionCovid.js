import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function PrevencionCovid() {
  return (
    <ScrollView>
      <View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            Los síntomas más habituales de la COVID-19 son la fiebre, la tos
            seca y el cansancio. Otros síntomas menos frecuentes que afectan a
            algunos pacientes son los dolores y molestias, la congestión nasal,
            el dolor de cabeza, la conjuntivitis, el dolor de garganta, la
            diarrea, la pérdida del gusto o el olfato y las erupciones cutáneas
            o cambios de color en los dedos de las manos o los pies. Estos
            síntomas suelen ser leves y comienzan gradualmente. Algunas de las
            personas infectadas solo presentan síntomas levísimos.
          </Text>
        </View>
        <Text style={styles.textTitel}>Prevención coronavirus</Text>
        <View style={styles.tiny}>
          <View style={styles.centrarImagen}>
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/image/png/1.png")}
            />
            <Text>Uso de mascarilla</Text>
          </View>
          <View style={styles.centrarImagen}>
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/image/png/2.png")}
            />
            <Text>Desinfección de manos</Text>
          </View>
        </View>
        <View style={styles.tiny}>
          <View style={styles.centrarImagen}>
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/image/png/3.png")}
            />
            <Text>Lavado de manos</Text>
          </View>
          <View style={styles.centrarImagen}>
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/image/png/4.png")}
            />
            <Text>Distanciamiento</Text>
          </View>
        </View>
        <View style={styles.tiny}>
          <View style={styles.centrarImagen}>
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/image/png/5.png")}
            />
            <Text>Desinfección</Text>
          </View>
          <View style={styles.centrarImagen}>
            <Image
              style={styles.tinyLogo}
              source={require("../../../assets/image/png/6.png")}
            />
            <Text>Cuarentena</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textoPrie: {
    paddingTop: "1%",
    textAlign: "center",
  },
  textoPriem: {
    fontSize: 15,
    textAlign: "justify",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  tiny: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: "6%",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  textTitel: {
    padding: "1%",
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  centrarImagen: {
    alignItems: "center",
  },
});
