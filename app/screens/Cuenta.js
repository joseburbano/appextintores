import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import LoadingApi from "../components/LoadingApi";
import { dataUserApi } from "../api/user";
import Colores from "../styles/Colors";
import Toast from "react-native-toast-message";
import InfoUser from "../components/Perfil/InfoUser";
import MaxInfoUser from "../components/Perfil/MaxInfoUser";

export default function Cuenta() {
  const { signOut } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    (async () => {
      const idUser = await AsyncStorage.getItem("id");
      await dataUserApi(idUser)
        .then((response) => {
          if (response.code === 200) {
            setUserInfo(response.user);
          } else {
            if (response.message === "Sesión Invalida") {
              Toast.show({
                text1: "Algo salio mal!",
                text2: `${response.message}`,
              });
              signOut();
            } else {
              Toast.show({
                text1: "Algo salio mal!",
                text2: `${response.message}`,
              });
            }
          }
        })
        .catch(() => {
          Toast.show({
            text1: "Algo salio mal!",
            text2: "Error del servidor o compruebe su internet.",
          });
        });
    })();
  }, []);

  return (
    <ScrollView>
      <View style={styles.viewUserInfo}>
        <StatusBar backgroundColor={Colores.GREEN} translucent={true} />
        {userInfo && (
          <InfoUser
            userInfo={userInfo}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        )}
        {userInfo && <MaxInfoUser userInfo={userInfo} />}
        <Button
          title="Cerrar sesión"
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnCloseSessionText}
          onPress={() => signOut()}
        />
        <LoadingApi text={loadingText} isVisible={loading} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: Colores.GRAY,
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: Colores.WHITE,
    borderTopWidth: 1,
    borderTopColor: Colores.GRAY,
    borderBottomWidth: 1,
    borderBottomColor: Colores.GRAY,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: Colores.GREEN,
  },
});
