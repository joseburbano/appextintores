import React from "react";
import { View, StatusBar, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { imageBackgroundStyle } from "../styles/General";

export default function Cargando(props) {
  const { navigation } = props;
  setTimeout(() => {
    navigation.navigate("Login");
  }, 3000);

  return (
    <View style={imageBackgroundStyle.image}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
      <Animatable.Image
        animation="pulse"
        useNativeDriver={true}
        easing="ease-out"
        iterationCount="infinite"
        style={{
          width: 200,
          height: 200,
          margin: 200,
        }}
        source={require("../../assets/image/jpg/corhuila.jpg")}
      />
      <Text>v1.0</Text>
    </View>
  );
}
