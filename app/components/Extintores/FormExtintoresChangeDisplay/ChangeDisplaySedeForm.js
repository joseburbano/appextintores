import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplaySedeForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplaySede, setNewDisplaySede] = useState(null);
  const [isLoadingSede, setIsLoadingSede] = useState(false);

  const onSubmit = () => {
    if (!newDisplaySede) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "La sede del extintor esta vacio.",
      });
    } else if (displayName === newDisplaySede) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "La sede no puede ser igual al actual.",
      });
    } else {
      setIsLoadingSede(true);
      const update = {
        sede: newDisplaySede,
        fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
          setRealoadExtintorInfo(true);
          setIsLoadingSede(false);
          setShowModal(false);
          setNewDisplaySede(null);
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
          setIsLoadingSede(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "Prado Alto",
            myValue: "prado alto",
          },
          {
            myLabel: "Quirinal",
            myValue: "quirinal",
          },
          {
            myLabel: "Pitalito",
            myValue: "pitalito",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Sede" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 5 }}
        // On value change
        onChange={(value) => setNewDisplaySede(value)}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingSede}
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
