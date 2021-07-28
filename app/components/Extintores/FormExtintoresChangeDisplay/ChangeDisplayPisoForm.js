import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayPisoForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayPiso, setNewDisplayPiso] = useState(null);
  const [isLoadingPiso, setIsLoadingPiso] = useState(false);

  const onSubmit = () => {
    if (!newDisplayPiso) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El bloque del extintor esta vacio.",
      });
    } else if (displayName === newDisplayPiso) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El bloque del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingPiso(true);
      var update = {
        ubicacionPiso: newDisplayPiso,
        fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
          setIsLoadingPiso(false);
          setShowModal(false);
          setNewDisplayPiso(null);
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
          setIsLoadingPiso(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "1",
            myValue: "1",
          },
          {
            myLabel: "2",
            myValue: "2",
          },
          {
            myLabel: "3",
            myValue: "3",
          },
          {
            myLabel: "4",
            myValue: "4",
          },
          {
            myLabel: "5",
            myValue: "5",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Piso" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 5 }}
        // On value change
        onChange={(value) => setNewDisplayPiso(value)}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingPiso}
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
