import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

export default function ClaseFuego() {
  return (
    <ScrollView>
      <View style={styles.espa}>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPrieme}>Clase A:</Text>
        </View>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/ico-a.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            Fuego de materiales combustibles sólidos (madera, tejidos, plástico,
            papel, etc.) Para su extinción requiere de enfriamiento, es decir se
            elimina el componente temperatura. El agua es la sustancia extintora
            ideal. Se usan extintores Clase A, ADB o AB.
          </Text>
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPrieme}>Clase B:</Text>
        </View>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/fuego-clase-b.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            Fuego de líquidos combustibles sólidos (pintura, grasa, solventes,
            etc.) Se apagan eliminando el oxígeno o interrumpiendo la reacción
            en cadena que se produce durante la combustión. se usan Extintores
            BC, ABC, AFFF (espuma).
          </Text>
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPrieme}>Clase C:</Text>
        </View>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/ico-c.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            Comprende aquellos fuegos que se originan debido a la combustión de
            gases a alta temperatura, como puede ser el metano o el gas natural.
            Este tipo de fuego se caracteriza y diferencia de otros porque suele
            aparecer con más rapidez. Se trata de fuegos que requieren polvo
            seco para su extinción.
          </Text>
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPrieme}>Clase D:</Text>
        </View>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/claseD.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            En este apartado se engloban los fuegos cuyo origen se debe a la
            combustión de algún tipo de metal o polvo de metal inflamable, como
            es el caso de los fuegos provocados por el magnesio. Para apagar
            este tipo de fuegos deben emplearse extintores de polvo especiales.
            Nunca deben apagarse con agua, ya que ésta provoca en ellos una
            reacción muy violenta.
          </Text>
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPrieme}>Clase K:</Text>
        </View>
        <View style={styles.tiny}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/image/png/fuegok.png")}
          />
        </View>
        <View style={styles.textoPrie}>
          <Text style={styles.textoPriem}>
            Este tipo de fuegos son conocidos en el continente europeo como de
            clase F, aunque deberemos tener en cuenta que en los territorios de
            habla inglesa son denominados como fuegos de clase K. A esta clase
            pertenecen los fuegos en los cuales el combustible que ha dado lugar
            a su origen ha sido la grasa o el aceite que suele usarse en las
            cocinas.
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
  textoPrieme: {
    paddingTop: "3%",
    fontSize: 16,
    paddingLeft: "4%",
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  tiny: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
