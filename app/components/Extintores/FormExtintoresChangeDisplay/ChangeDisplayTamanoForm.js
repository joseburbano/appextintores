import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayTamanoForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayTamanio, setNewDisplayTamanio] = useState(null);
  const [isLoadingTamanio, setIsLoadingTamanio] = useState(false);

  const onSubmit = () => {
    if (!newDisplayTamanio) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El tamaño del extintor esta vacio.",
      });
    } else if (displayName === newDisplayTamanio) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El tamaño del extintor esta vacio.",
      });
    } else {
      setIsLoadingTamanio(true);
      const update = {
        tamanio: newDisplayTamanio,
        fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
          setRealoadExtintorInfo(true);
          setIsLoadingTamanio(false);
          setShowModal(false);
          setNewDisplayTamanio(null);
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
          setIsLoadingTamanio(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "5 Libras",
            myValue: "5 libras",
          },
          {
            myLabel: "10 Libras",
            myValue: "10 libras",
          },
          {
            myLabel: "20 Libras",
            myValue: "20 libras",
          },
          {
            myLabel: "30 Libras",
            myValue: "30 libras",
          },
          {
            myLabel: "2,5 Galones",
            myValue: "2,5 galones",
          },
          {
            myLabel: "3700 Gramos",
            myValue: "3700 gramos",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Tamaño" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 30 }}
        // On value change
        onChange={(value) => setNewDisplayTamanio(value)}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingTamanio}
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
