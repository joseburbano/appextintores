import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getAvatarApi } from "../../api/user";
import { Avatar, Accessory } from "react-native-elements";
import { uploadAvatarApi } from "../../api/user";
import { getAccessTokenApi } from "../../api/auth";
import Toast from "react-native-toast-message";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Colores from "../../styles/Colors";

export default function InfoUser(props) {
  const {
    userInfo: { _id, avatar, fullname, email },
    setLoading,
    setLoadingText,
  } = props;

  const [imagenAvatar, setImagenAvatar] = useState(null);
  const [token, setToken] = useState(null);
  const { estad } = getAccessTokenApi();

  useEffect(() => {
    if (estad) setToken(estad);
  }, [estad]);

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      Toast.show({
        text1: "Algo salio mal!",
        text2: "Es necesario aceptar los permisos de la galeria.",
      });
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        path: "",
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (result.cancelled) {
        Toast.show({
          text1: "Algo salio mal!",
          text2: "Es necesario aceptar los permisos de la galeria.",
        });
      } else {
        uploadImage(result.uri);
      }
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);
    const responses = await fetch(uri);
    const blob = await responses.blob();
    console.log(JSON.stringify(blob));
    const name = JSON.stringify(blob._data.name);
    await uploadAvatarApi(token, blob, _id, name);
    // .then((response) => {
    // if (response.code === 200) {
    // Toast.show({
    //   text1: "Bien!",
    //   text2: `${response.message}`,
    // });
    // } else {
    //   Toast.show({
    //   text1: "Algo salio mal!",
    //   text2: `${response.message}`,
    // });
    // }
    // })
    // .catch(() => {
    // Toast.show({
    //   text1: "Algo salio mal!",
    //   text2: "Error al subir la imagen",
    // });
    // });
  };
  //traer imagen
  useEffect(() => {
    (async () => {
      const foto = await getAvatarApi(avatar);
      setImagenAvatar(foto);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="xlarge"
        showAccessory="true"
        onPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={
          imagenAvatar
            ? { uri: imagenAvatar }
            : require("../../../assets/image/jpg/avatar-default.jpg")
        }
      >
        <Accessory />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {fullname ? fullname : "Anónimo"}
        </Text>
        <Text>{email ? email : "Anónimo"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colores.WHITE,
    paddingTop: 10,
    paddingBottom: 10,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
