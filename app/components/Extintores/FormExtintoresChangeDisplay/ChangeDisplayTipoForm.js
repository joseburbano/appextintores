import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayTipoForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayTipo, setNewDisplayTipo] = useState(null);
  const [isLoadingTipo, setIsLoadingTipo] = useState(false);

  const onSubmit = () => {
    if (!newDisplayTipo) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El tipo de extintor esta vacio.",
      });
    } else if (displayName === newDisplayTipo) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El tipo de extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingTipo(true);
      const update = {
        tipoExt: newDisplayTipo,
        fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
          setRealoadExtintorInfo(true);
          setIsLoadingTipo(false);
          setShowModal(false);
          setNewDisplayTipo(null);
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
          setIsLoadingTipo(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "ABC",
            myValue: "abc",
          },
          {
            myLabel: "Agua",
            myValue: "agua",
          },
          {
            myLabel: "CO2",
            myValue: "co2",
          },
          {
            myLabel: "Solkaflan",
            myValue: "solkaflan",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Tipo" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 5 }}
        // On value change
        onChange={(value) => setNewDisplayTipo(value)}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingTipo}
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
