import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import Colores from "../styles/Colors";

export default function LoadingApi(props) {
  const { isVisible, text } = props;
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0, 0.5)"
      overlayBackgroundColor="transparente"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color={Colores.GREEN} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: Colores.WHITE,
    borderColor: Colores.GREEN,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colores.GREEN,
    textTransform: "uppercase",
  },
});
