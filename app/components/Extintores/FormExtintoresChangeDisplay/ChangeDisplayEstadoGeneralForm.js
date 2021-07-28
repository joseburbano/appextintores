import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayEstadoGeneralForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayEstadoGeneral, setNewDisplayEstadoGeneral] = useState(
    defaultEstadoGeneralValue()
  );
  const [isLoadingEstadoGeneral, setIsLoadingEstadoGeneral] = useState(false);

  const onChange = (value, type) => {
    setNewDisplayEstadoGeneral({ ...newDisplayEstadoGeneral, [type]: value });
  };

  const onSubmit = () => {
    if (!newDisplayEstadoGeneral) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El estado general del extintor esta vacio.",
      });
    } else if (displayName === newDisplayEstadoGeneral) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El estado general del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingEstadoGeneral(true);
      updateExtintorApi(tokenUpdate, idEx, newDisplayEstadoGeneral)
        .then((response) => {
          setIsLoadingEstadoGeneral(false);
          setShowModal(false);
          setNewDisplayEstadoGeneral(null);
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
          setIsLoadingEstadoGeneral(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "Bueno",
            myValue: "bueno",
          },
          {
            myLabel: "Medio",
            myValue: "medio",
          },
          {
            myLabel: "Malo",
            myValue: "malo",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Estado general" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 5 }}
        // On value change
        onChange={(value) => onChange(value, "estado")}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingEstadoGeneral}
      />
    </View>
  );

  function defaultEstadoGeneralValue() {
    return {
      estado: "",
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
});
