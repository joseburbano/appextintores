import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import Colores from "../../../styles/Colors";
import Toast from "react-native-toast-message";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayFechaVenciForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setShowModal,
    setRealoadExtintorInfo,
    toastRef,
  } = props;
  const [newDisplayFechaVenci, setNewDisplayFechaVenci] = useState(
    defaultFechaVenciValue()
  );
  const [isLoadingFechaVenci, setIsLoadingFechaVenci] = useState(false);

  const onChangeFechaVenci = (e, type) => {
    setNewDisplayFechaVenci({
      ...newDisplayFechaVenci,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = () => {
    if (!newDisplayFechaVenci) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "La fecha de vencimiento del extintor esta vacio.",
      });
    } else if (displayName === newDisplayFechaVenci) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2:
          "La fecha de vencimiento del extintor no puede ser igual al actual.",
      });
    } else {
      setIsLoadingFechaVenci(true);
      updateExtintorApi(tokenUpdate, idEx, newDisplayFechaVenci)
        .then((response) => {
          setIsLoadingFechaVenci(false);
          setShowModal(false);
          setNewDisplayFechaVenci(null);
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
          setIsLoadingFechaVenci(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      {/* <DatePicker
        mode="date"
        date={displayName}
        onDateChange={(e) => onChangeFechaVenci(e, "fechaVencimiento")}
      /> */}
      <Button
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoadingObservation}
      />
    </View>
  );

  function defaultFechaVenciValue() {
    return {
      fechaVencimiento: "",
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
