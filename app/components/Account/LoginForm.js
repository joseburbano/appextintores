import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Icon, Button } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import Colores from "../../styles/Colors";
import { isEmpty } from "lodash";
import { signInApi } from "../../api/user";
import { validateEmail } from "../../utils/validation";

export default function LoginForm() {
  const [verPassword, setVerPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const { signIn } = useContext(AuthContext);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      Toast.show({
        type: "info",
        text1: "Algo salio mal!",
        text2: "Todos los campos son obligatorios.",
      });
    } else if (!validateEmail(formData.email)) {
      Toast.show({
        type: "info",
        text1: "Algo salio mal!",
        text2: "El email no es correcto.",
      });
    } else {
      const result = await signInApi(formData);
      if (result.message) {
        Toast.show({
          type: "error",
          text1: "Algo salio mal!",
          text2: `${result.message}`,
        });
      } else {
        try { 
          const accessToken = result.accessToken;
          const refreshToken = result.refreshToken;
          const user = result.user;
          const rol = result.rol;

          const value = await AsyncStorage.setItem("@accessToken", accessToken);
          await AsyncStorage.setItem("@refreshToken", refreshToken);
          await AsyncStorage.setItem("@id", user);
          await AsyncStorage.setItem("@rol", rol);

 

          if (value == null) {
            Toast.show({
              type: "success",
              text1: "Bien!",
              text2: "Inicio de sesión Correcto",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Algo salio mal!",
              text2: "Error al almacenar en el localStorage",
            });
          }
          signIn();
        } catch (e){
          Toast.show({
            type: "error",
            text1: "Algo salio mal!",
            text2: "Compruebe su conexión a internet",
          });
        }
      }
    }
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={verPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={verPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setVerPassword(!verPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  inputForm: {
    width: "96%",
    marginTop: 20,
  },
  btnContainer: {
    width: "90%",
  },
  btnLogin: {
    backgroundColor: Colores.GREEN,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  textoback: {
    color: Colores.WHITE,
  },
});
