import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayPlacaForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayPlaca, setNewDisplayPlaca] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayPlaca) {
      setError("El ID de la placa esta vacio.");
    } else if (displayName === newDisplayPlaca) {
      setError("El ID de la placa no puede ser igual al actual. ");
    } else {
      setIsLoading(true);
      const update = {
        placa: newDisplayPlaca,
        fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
          setRealoadExtintorInfo(true);
          setIsLoading(false);
          setShowModal(false);
          setNewDisplayPlaca(null);
          Toast.show({
            type: "success",
            text1: "Actualización Correcta",
            text2: `${response.message}`,
          });
        })
        .catch(() => {
          setError("Error al actualizar.");
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: "Error del servidor.",
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Placa del Extintor"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "file-document-edit",
          color: Colores.GREEN,
        }}
        defaultValue={displayName || ""}
        onChange={(e) => setNewDisplayPlaca(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
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
});
