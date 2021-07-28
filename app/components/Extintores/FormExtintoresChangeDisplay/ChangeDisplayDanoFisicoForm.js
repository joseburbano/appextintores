import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayDanoFisicoForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayDanoFisico, setNewDisplayDanoFisico] = useState(
    defaultDanoFisicoValue()
  );
  const [isLoadingDanoFisico, setIsLoadingDanoFisico] = useState(false);

  const onChangeDanoFisico = (e, type) => {
    setNewDisplayDanoFisico({ ...newDisplayDanoFisico, [type]: e.nativeEvent.text });
  };

  console.log(newDisplayDanoFisico);

  const onSubmit = () => {
    if (!newDisplayDanoFisico) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El daño del extintor esta vacio.",
      });
    } else if (displayName === newDisplayDanoFisico) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El daño del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingDanoFisico(true);
      updateExtintorApi(tokenUpdate, idEx, newDisplayDanoFisico)
        .then((response) => {
          setIsLoadingDanoFisico(false);
          setShowModal(false);
          setNewDisplayDanoFisico(null);
          setRealoadExtintorInfo(true);
          Toast.show({
            type: "success",
            text1: "Actualización Correcta",
            text2: `${response.message}`,
          });
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: "Error al actualizar.",
          });
          setIsLoadingDanoFisico(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textoCaja}
        onChange={(e) => onChangeDanoFisico(e, "danoFisico")}
        numberOfLines={9}
        maxLength={600}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingDanoFisico}
      />
    </View>
  );

  function defaultDanoFisicoValue() {
    return {
      danoFisico: "",
      fechaUpdate: fechaActual,
    };
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 1,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: Colores.GREEN,
  },
  textoCaja: {
    padding: "3%",
    borderColor: Colores.GREEN,
    borderWidth: 1,
    width: "95%",
  },
});
