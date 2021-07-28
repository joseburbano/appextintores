import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayBloqueForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayBloque, setNewDisplayBloque] = useState(null);
  const [isLoadingBloque, setIsLoadingBloque] = useState(false);

  const onSubmit = () => {
    if (!newDisplayBloque) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El bloque del extintor esta vacio.",
      });
    } else if (displayName === newDisplayBloque) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El bloque del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingBloque(true);
      var update = {
        ubicacionBloque: newDisplayBloque,
        fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
          setIsLoadingBloque(false);
          setShowModal(false);
          setNewDisplayBloque(null);
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
          setIsLoadingBloque(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "A",
            myValue: "a",
          },
          {
            myLabel: "B",
            myValue: "b",
          },
          {
            myLabel: "C",
            myValue: "c",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Bloque" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 5 }}
        // On value change
        onChange={(value) => setNewDisplayBloque(value)}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingBloque}
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
