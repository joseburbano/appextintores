import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform, TextInput } from "react-native";
import { Avatar, Accessory, Input, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { getAccessTokenApi } from "../../api/auth";
import * as RootNavigation from "../../navigation/RootNavigation";
import { uploadImagenApi, addParticipacionApi } from "../../api/participacion";
import Toast from "react-native-toast-message";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { isEmpty } from "lodash";
import Colores from "../../styles/Colors";

export default function CondicionInseguraForm(props) {
  const { userId, setLoading, setLoadingText } = props;
  const [participacionData, setParticipacionData] = useState(
    defaultFormValueCondicion()
  );
  const [imagenAvatar, setImagenAvatar] = useState(null);
  const [token, setToken] = useState(null);
  const { estad } = getAccessTokenApi();
  const fechaa = new Date();

  useEffect(() => {
    setParticipacionData({ ...participacionData, fecha: fechaa });
  },[]);

  useEffect(() => {
    if (estad) setToken(estad);
  }, [estad]);

  const onChangeFormCondicion = (e, type) => {
    setParticipacionData({ ...participacionData, [type]: e.nativeEvent.text });
  };

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
          text2: "Has cerrado la selección de imagenes.",
        });
      } else {
        setImagenAvatar(result.uri);
      }
    }
  };

  

  const uploadImage = async (uri, id) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);
    const responses = await fetch(uri);
    const blob = await responses.blob();
    const name = JSON.stringify(blob._data.name);
    uploadImagenApi(token, blob, id, name)
      .then((response) => {
        if (response.code === 200) {
          Toast.show({ text1: "Bien!", text2: `${response.message}` });
          RootNavigation.navigate("Inicio");
        } else {
          Toast.show({
            text1: "Algo salio mal!",
            text2: `${response.message}`,
          });
        }
      })
      .catch(() => {
        Toast.show({
          text1: "Algo salio mal!",
          text2: "Error al subir la imagen",
        });
      });
  };
 
  const onSubmitParticipacion = async () => {
    if (
      isEmpty(participacionData.claseRiesgoLocativo) ||
      isEmpty(participacionData.condicionInsegura) ||
      isEmpty(participacionData.lugar) ||
      isEmpty(participacionData.primerosAuxilios) ||
      isEmpty(participacionData.relacionTrabajo) ||
      isEmpty(participacionData.descripcionNovedad) ||
      isEmpty(participacionData.motivoRazon) ||
      isEmpty(participacionData.medidasImplementar)
    ) {
      Toast.show({
        text1: "Algo salio mal!",
        text2: "Todos los campos son obligatorios.",
      });
    } else {
      try {
        addParticipacionApi(token, participacionData, userId)
          .then((response) => {
            if (response.code === 200) {
              Toast.show({ text1: "Bien!", text2: `${response.message}` });
              setParticipacionData({});
              uploadImage(imagenAvatar, response.iduser);
            } else {
              Toast.show({
                text1: "Algo salio mal!",
                text2: `${response.message}`,
              });
            }
          })
          .catch(() => {
            Toast.show({
              text1: "Algo salio mal!",
              text2: "Error del servidor.",
            });
          });
      } catch {
        Toast.show({
          text1: "Algo salio mal!",
          text2: "Compruebe su conexión a internet.",
        });
      }
    }
  };

  return (
    <View>
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
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.textopregunt}>Tipo de evento</Text>
        <RNPickerSelect
          placeholder={placeholderTipoEvento}
          onValueChange={(value) =>
            setParticipacionData({
              ...participacionData,
              claseRiesgoLocativo: value,
            })
          }
          items={[
            { label: "Incidente", value: "Incidente" },
            { label: "Emergencia", value: "Emergencia" },
            { label: "Comportamental", value: "Comportamental" },
            { label: "Medio Ambiente", value: "Medio Ambiente" },
          ]}
          style={
            Platform.OS === "ios"
              ? styles.selectPuntIOS
              : styles.selectPuntAndroid
          }
          useNativeAndroidPickerStyle={true}
        />
        <Text style={styles.textopregunt}>Clasificacion de falla</Text>
        <RNPickerSelect
          placeholder={placeholderClasificacionFalla}
          onValueChange={(value) =>
            setParticipacionData({
              ...participacionData,
              condicionInsegura: value,
            })
          }
          items={[
            { label: "Salud Enfermedad", value: "Salud Enfermedad" },
            { label: "Lesiones, accidentes laborales", value: "No" },
            { label: "Productos, procesos", value: "Productos, procesos" },
            { label: "Activos", value: "Activos" },
            {
              label: "Equipos y Herramientas",
              value: "Equipos y Herramientas",
            },
            { label: "Bienes a terceros", value: "Bienes a terceros" },
            { label: "Vehiculos", value: "Vehiculos" },
            { label: "Contaminacion", value: "Contaminacion" },
            { label: "Comunidad", value: "Comunidad" },
            { label: "Tiempo", value: "Tiempo" },
            {
              label: "Informacion, documentación",
              value: "Informacion, documentación",
            },
            {
              label: "Imagen de la institucion",
              value: "Imagen de la institucion",
            },
          ]}
          style={
            Platform.OS === "ios"
              ? styles.selectPuntIOS
              : styles.selectPuntAndroid
          }
          useNativeAndroidPickerStyle={true}
        />
        <Text style={styles.textopregunt}>Requiere Primeros Auxilios</Text>
        <RNPickerSelect
          placeholder={placeholderPrimerosAuxilios}
          onValueChange={(value) =>
            setParticipacionData({
              ...participacionData,
              primerosAuxilios: value,
            })
          }
          items={[
            { label: "Si", value: "Si" },
            { label: "No", value: "No" },
          ]}
          style={
            Platform.OS === "ios"
              ? styles.selectPuntIOS
              : styles.selectPuntAndroid
          }
          useNativeAndroidPickerStyle={true}
        />
        <Text style={styles.textopregunt}>Tiene Relacion con el trabajo</Text>
        <RNPickerSelect
          placeholder={placeholderRelacionTrabajo}
          onValueChange={(value) =>
            setParticipacionData({
              ...participacionData,
              relacionTrabajo: value,
            })
          }
          items={[
            { label: "Si", value: "Si" },
            { label: "No", value: "No" },
          ]}
          style={
            Platform.OS === "ios"
              ? styles.selectPuntIOS
              : styles.selectPuntAndroid
          }
          useNativeAndroidPickerStyle={true}
        />
        <Text style={styles.textopregunt}>
          Lugar donde se presente la novedad
        </Text>
        <Input
          placeholder="Lugar donde se presente la novedad"
          containerStyle={styles.inputForm}
          onChange={(e) => onChangeFormCondicion(e, "lugar")}
        />
        <Text style={styles.textopregunt}>Descripción de la novedad</Text>
        <TextInput
          style={styles.textoCaja}
          onChange={(e) => onChangeFormCondicion(e, "descripcionNovedad")}
          value={participacionData.descripcionNovedad}
          numberOfLines={9}
          maxLength={600}
        />
        <Text style={styles.textopregunt}>Describir que recomienda</Text>
        <TextInput
          style={styles.textoCaja}
          onChange={(e) => onChangeFormCondicion(e, "motivoRazon")}
          value={participacionData.motivoRazon}
          numberOfLines={9}
          maxLength={600}
        />
        <Text style={styles.textopregunt}>Que medida se puede tomar</Text>
        <TextInput
          style={styles.textoCaja}
          onChange={(e) => onChangeFormCondicion(e, "medidasImplementar")}
          value={participacionData.medidasImplementar}
          numberOfLines={9}
          maxLength={600}
        />
        <Button
          title="Registrar normativa insegura"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnLogin}
          onPress={onSubmitParticipacion}
        />
      </View>
    </View>
  );
}

const placeholderTipoEvento = {
  label: "Tipo de evento...",
  value: null,
  color: Colores.GREEN,
};
const placeholderClasificacionFalla = {
  label: "Clasificación de la falla...",
  value: null,
  color: Colores.GREEN,
};
const placeholderPrimerosAuxilios = {
  label: "Requiere primeros auxilios...",
  value: null,
  color: Colores.GREEN,
};
const placeholderRelacionTrabajo = {
  label: "Tiene Relacion con el trabajo...",
  value: null,
  color: Colores.GREEN,
};

function defaultFormValueCondicion() {
  return {
    claseRiesgoLocativo: "",
    condicionInsegura: "",
    primerosAuxilios: "",
    relacionTrabajo: "",
    lugar: "",
    descripcionNovedad: "",
    motivoRazon: "",
    medidasImplementar: "",
    fecha: "",
  };
}

const styles = StyleSheet.create({
  selectPuntIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colores.GREEN,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  selectPuntAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colores.GREEN,
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textoCaja: {
    padding: "3%",
    borderColor: Colores.GREEN,
    borderWidth: 1,
    width: "95%",
  },
  itemsSedeTitle: {
    color: Colores.WHITE,
  },
  itemsSede: {
    backgroundColor: Colores.RED,
  },
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
    padding: "3%",
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
  textopregunt: {
    textAlign: "justify",
    paddingRight: "4%",
    paddingLeft: "4%",
    padding: "3%",
  },
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
  textCate: {
    fontSize: 26,
    color: Colores.WHITE,
  },
});
