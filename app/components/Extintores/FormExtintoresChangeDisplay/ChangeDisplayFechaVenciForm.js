import React, { useState } from "react";
import { StyleSheet, View, Platform,  Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from "react-native-toast-message";
import { updateExtintorApi } from "../../../api/extintor";

export default function ChangeDisplayFechaVenciForm(props) {
  const {
    displayName,
    tokenUpdate,
    fechaActual,
    idEx,
    setRealoadExtintorInfo,
    setShowModal,
  } = props;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);

  const onChangeFechaVenci = (e, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setDate(selectedDate);
    if (!selectedDate) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "La fecha de vencimiento del extintor esta vacio.",
      });
    } else if (displayName === selectedDate) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2:
          "La fecha de vencimiento del extintor no puede ser igual al actual.",
      });
    } else {
      const update = {
         fechaVencimiento: selectedDate,
         fechaUpdate: fechaActual,
      };
      updateExtintorApi(tokenUpdate, idEx, update)
        .then((response) => {
           setShowModal(false);
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
        });
    }
  };

   const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  return (
    <View style={styles.view}>
       <View>
        <Button onPress={showDatepicker} title="Seleccionar Fecha!" />
      </View>
    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeFechaVenci}
        />
      )}
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
});
