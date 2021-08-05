import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
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
    setShow,
    show,
  } = props;
  const [newDisplayFechaVenci, setNewDisplayFechaVenci] = useState(
    defaultFechaVenciValue()
  );
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');

   (async () => {
    setMode('date');
     setShow(true);
    })();

  const onChangeFechaVenci = (e, type) => {
    setNewDisplayFechaVenci({
      ...newDisplayFechaVenci,
      [type]: e,
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
});
