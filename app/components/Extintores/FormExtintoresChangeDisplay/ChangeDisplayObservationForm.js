import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayObservationForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayObservation, setNewDisplayObservation] = useState(
    defaultObservationValue()
  );
  const [isLoadingObservation, setIsLoadingObservation] = useState(false);

  const onChangeObservation = (e, type) => {
    setNewDisplayObservation({ ...newDisplayObservation, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (!newDisplayObservation) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "La observación del extintor esta vacio.",
      });
    } else if (displayName === newDisplayObservation) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "La Observación del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingObservation(true);
      updateExtintorApi(tokenUpdate, idEx, newDisplayObservation)
        .then((response) => {
          setRealoadExtintorInfo(true);
          setIsLoadingObservation(false);
          setShowModal(false);
          setNewDisplayObservation(null);
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
          setIsLoadingObservation(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textoCaja}
        onChange={(e) => onChangeObservation(e, "observaciones")}
        numberOfLines={9}
        maxLength={600}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingObservation}
      />
    </View>
  );

  function defaultObservationValue() {
    return {
      observaciones: "",
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
