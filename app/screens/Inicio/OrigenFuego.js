import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function OrigenFuego() {
  return (
    <ScrollView>
      <View style={styles.espa}>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            El tetraedro del fuego representa a los 4 elementos necesarios para
            que el fuego pueda originar.
          </Text>
        </View>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/origenfuego.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            El oxígeno y el combustible se encarga de mantener la combustión, el
            calor lleva al combustible a su estado de ignición y la relación
            entre los elementos permite que el fuego se origine. La privación de
            cualquiera de estos 4 elementos hará que el fuego no pueda generarse
            y en esto se basa el concepto de prevención del fuego.
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
    paddingTop: "1%",
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
    paddingTop: "1%",
  },
});
