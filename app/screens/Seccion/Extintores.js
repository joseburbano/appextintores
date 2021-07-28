import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import * as RootNavigation from "../../navigation/RootNavigation";
import Toast from "react-native-toast-message";
import Selector from "@wiicamp/react-native-selector";
import { isEmpty } from "lodash";
import Colores from "../../styles/Colors";

export default function Extintores() {
  const [consultaData, setConsultaData] = useState(defaultFormValueConsultaa());

  const menuOptionsSede = generateOptionsSedes();
  const menuOptionsBloque = generateOptionsBloques();
  const menuOptionsPiso = generateOptionsPiso();

  const onSubmitConsultaa = async () => {
    if (
      isEmpty(consultaData.sede) ||
      isEmpty(consultaData.bloque) ||
      isEmpty(consultaData.piso)
    ) {
      Toast.show({
        text1: "Algo salio mal!",
        text2: "Todos los campos son obligatorios.",
      });
    } else {
      RootNavigation.navigate("Consulta", consultaData);
    }
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text style={styles.titulo}>Seleccione todos los campos</Text>
          <View style={styles.entreItem}>
            <Selector
              theme="dropdown" // Default: 'simple'
              items={menuOptionsSede}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccionar Sede" // Placeholder for dropdown UI
              loading={false} // Set loading for selector
              disabled={false} // Set disable for selector
              // Styles
              textOptionStyle={{ color: Colores.GREEN }}
              placeholderContainerStyle={{ paddingVertical: 20 }}
              placeholderStyle={{ color: Colores.RED }}
              iconStyle={{ tintColor: Colores.GREEN }}
              loadingStyle={{ marginBottom: 10 }}
              // On value change
              onChange={(value) =>
                setConsultaData({
                  ...consultaData,
                  sede: value,
                })
              }
            />
          </View>
        </View>
        <View>
          <View style={styles.entreItem}>
            <Selector
              theme="dropdown" // Default: 'simple'
              items={menuOptionsBloque}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccionar Bloque" // Placeholder for dropdown UI
              loading={false} // Set loading for selector
              disabled={false} // Set disable for selector
              // Styles
              textOptionStyle={{ color: Colores.GREEN }}
              placeholderContainerStyle={{ paddingVertical: 20 }}
              placeholderStyle={{ color: Colores.RED }}
              iconStyle={{ tintColor: Colores.BLACK }}
              loadingStyle={{ marginBottom: 10 }}
              // On value change
              onChange={(value) =>
                setConsultaData({
                  ...consultaData,
                  bloque: value,
                })
              }
            />
          </View>
        </View>
        <View>
          <View style={styles.entreItem}>
            <Selector
              theme="dropdown" // Default: 'simple'
              items={menuOptionsPiso}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccionar Piso" // Placeholder for dropdown UI
              loading={false} // Set loading for selector
              disabled={false} // Set disable for selector
              // Styles
              textOptionStyle={{ color: Colores.GREEN }}
              placeholderContainerStyle={{ paddingVertical: 20 }}
              placeholderStyle={{ color: Colores.RED }}
              iconStyle={{ tintColor: Colores.BLACK }}
              loadingStyle={{ marginBottom: 10 }}
              // On value change
              onChange={(value) =>
                setConsultaData({
                  ...consultaData,
                  piso: value,
                })
              }
            />
          </View>
        </View>
      </View>
      <Button
        title="Consultar"
        containerStyle={styles.btnContainerBoton}
        buttonStyle={styles.btnConsul}
        onPress={onSubmitConsultaa}
      />
    </ScrollView>
  );
}

function defaultFormValueConsultaa() {
  return {
    sede: "",
    bloque: "",
    piso: "",
  };
}

function generateOptionsSedes() {
  return [
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
  ];
}
function generateOptionsBloques() {
  return [
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
    {
      myLabel: "D",
      myValue: "d",
    },
  ];
}

function generateOptionsPiso() {
  return [
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
  ];
}

const styles = StyleSheet.create({
  titulo: {
    paddingTop: "3%",
    padding: "3%",
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
  },
  contatiners: {
    paddingTop: "3%",
    backgroundColor: Colores.GREEN,
  },
  textCate: {
    fontSize: 26,
    color: Colores.WHITE,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colores.GREEN,
  },
  iconRightFle: {
    left: 0,
  },
  entreItem: {
    padding: "3%",
  },
  btnConsul: {
    backgroundColor: Colores.GREEN,
  },
  btnContainerBoton: {
    width: "100%",
    padding: "3%",
  },
});
