import React from "react";
import { View, StatusBar, Image, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import color from "../styles/Colors";
import LoginForm from "../components/Account/LoginForm";

export default function Login() {
  return (
    <KeyboardAwareScrollView>
      <View style={[loginStyles.container]}>
        <StatusBar backgroundColor={color.GREEN} translucent={true} />
        <View style={[loginStyles.imagen]}>
          <Image
            source={require("../../assets/image/jpg/corhuila.jpg")}
            style={[loginStyles.logo]}
          />
        </View>
        <View>
          <LoginForm />
        </View>
        <View style={loginStyles.imagen}>
          <Text style={loginStyles.version}>v1.0</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingTop: 60,
  },
  imagen: {
    justifyContent: "center",
    alignItems: "center",
  },
  version: {
    paddingTop: "75%",
  },
  logo: {
    padding: 33,
    height: 250,
    width: 250,
  },
});
