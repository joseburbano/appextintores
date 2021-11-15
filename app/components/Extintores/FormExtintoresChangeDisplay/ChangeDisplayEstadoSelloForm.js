import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayEstadoSelloForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayEstadoSello, setNewDisplayEstadoSello] = useState(
    defaultEstadoSelloValue()
  );
  const [isLoadingEstadoSello, setIsLoadingEstadoSello] = useState(false);

  const onChange = (value, type) => {
    setNewDisplayEstadoSello({ ...newDisplayEstadoSello, [type]: value });
  };

  const onSubmit = () => {
    if (!newDisplayEstadoSello) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El estado del sello del extintor esta vacio.",
      });
    } else if (displayName === newDisplayEstadoSello) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "El estado del sello del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingEstadoSello(true);
      updateExtintorApi(tokenUpdate, idEx, newDisplayEstadoSello)
        .then((response) => {
          setRealoadExtintorInfo(true);
          setIsLoadingEstadoSello(false);
          setShowModal(false);
          setNewDisplayEstadoSello(null);
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
          setIsLoadingEstadoSello(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Selector
        theme="dropdown" // Default: 'simple'
        items={[
          {
            myLabel: "Buen estado",
            myValue: "buen estado",
          },
          {
            myLabel: "Mal estado",
            myValue: "mal estado",
          },
        ]}
        // Specify key
        valueKey="myValue" // Default: 'value'
        labelKey="myLabel" // Default: 'label'
        placeholder="Seleccionar Estado del sello" // Placeholder for dropdown UI
        loading={false} // Set loading for selector
        disabled={false} // Set disable for selector
        // Styles
        textOptionStyle={{ color: Colores.GREEN }}
        placeholderContainerStyle={{ paddingVertical: "3%", width: "auto" }}
        placeholderStyle={{ color: Colores.GREEN }}
        iconStyle={{ tintColor: Colores.GREEN }}
        loadingStyle={{ marginBottom: 5 }}
        // On value change
        onChange={(value) => onChange(value, "estadoSello")}
      />
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingEstadoSello}
      />
    </View>
  );

  function defaultEstadoSelloValue() {
    return {
      estadoSello: "",
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
