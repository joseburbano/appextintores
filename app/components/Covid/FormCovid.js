import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button } from "react-native-elements";
import Selector from "@wiicamp/react-native-selector";
import { getAccessTokenApi } from "../../api/auth";
import MultiSelect from "react-native-multiple-select";
import * as RootNavigation from "../../navigation/RootNavigation";
import Toast from "react-native-toast-message";
import { addAgregarCovidApi } from "../../api/covid";
import Colores from "../../styles/Colors";
import { isEmpty } from "lodash";

export default function FormCovid() {
  const [token, setToken] = useState(null);
  const [covidData, setCovidData] = useState(defaultFormValue());
  const [selectedSintomas, setSelectedSintomas] = useState([]);
  const { estad } = getAccessTokenApi();

  useEffect(() => {
    if (estad) setToken(estad);
  }, [estad]);
  
  
  const onSelectedItemsChange = e => {
    setSelectedSintomas( e );
     setCovidData({ ...covidData, sintomas: selectedSintomas });
  };

console.log(selectedSintomas);

  const onChangeForm = (e, type) => {
    setCovidData({ ...covidData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    if (
      isEmpty(covidData.sede) ||
      isEmpty(covidData.diagnosticoCovid) ||
      isEmpty(covidData.diasCovid) ||
      isEmpty(covidData.sospecha) ||
      isEmpty(covidData.sintomas) ||
      isEmpty(covidData.fiebreDias) ||
      isEmpty(covidData.respiratoriosDias) ||
      isEmpty(covidData.sospechosoContagiado) ||
      isEmpty(covidData.sospechosoFamiliar) ||
      isEmpty(covidData.temperatura)
    ) {
      Toast.show({
        text1: "Algo salio mal!",
        text2: "Todos los campos son obligatorios.",
      });
    } else {
      var fecha = new Date();
      setCovidData({ ...covidData, fechaUpdate: fecha });
      try {
        var usuarioid = await AsyncStorage.getItem("@id");
        addAgregarCovidApi(token, covidData, usuarioid).then((response) => {
          if (response.code === 200) {
            Toast.show({ text1: "Bien!", text2: `${response.message}` });
            setCovidData({});
            RootNavigation.navigate("Inicio");
          } else {
            Toast.show({
              text1: "Algo salio mal!",
              text2: `${response.message}`,
            });
          }
        });
      } catch {
        Toast.show({
          text1: "Algo salio mal!",
          text2: "Compruebe su conexión a internet",
        });
      }
    }
  };

  const data = [
    {
      id: "Molestias y dolores",
      name: "Molestias y dolores",
    },
    {
      id: "Dolor de garganta",
      name: "Dolor de garganta",
    },
    { id: "Diarrea", name: "Diarrea" },
    { id: "Conjuntivitis", name: "Conjuntivitis" },
    {
      id: "Dolor de cabeza",
      name: "Dolor de cabeza",
    },
    {
      id: "Pérdida del sentido del olfato o del gusto",
      name: "Pérdida del sentido del olfato o del gusto",
    },
    {
      id:
        "Erupciones cutáneas o pérdida de color en los dedos de las manos o de los pies",
      name:
        "Erupciones cutáneas o pérdida de color en los dedos de las manos o de los pies",
    },
    {
      id: "Ninguna de las anteriores",
      name: "Ninguna de las anteriores",
    },
  ];

  return (
    <View style={styles.entreItem}>
      <Text style={styles.textopregunt}>Seleccione sede</Text>
            <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Sede Prado Alto", myValue: "Sede Prado Alto" },
                      { myLabel: "Sede Quirinal", myValue: "Sede Quirinal" },
                      { myLabel: "Sede Pitalito", myValue: "Sede Pitalito" },
                      { myLabel: "Sede Palermo", myValue: "Sede Palermo" },
                      { myLabel: "Sede Rivera", myValue: "Sede Rivera" },
                      { myLabel: "Trabajo en casa", myValue: "Trabajo en casa" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, sede: value })
              }
            />
      <Text style={styles.textopregunt}>
        ¿Ha tenido alguno de los siguientes enunciados? o  Ha sido diagnosticado con Covid-19?
      </Text>
       <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Si", myValue: "Si" },
                      { myLabel: "No", myValue: "No" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, diagnosticoCovid: value })
              }
            />
      <Text style={styles.textopregunt}>
        Si tuvo Covid 19 y esta en proceso de recuperación ¿Cuantos días han
        pasado desde que cumplió su proceso de cuarentena.?
      </Text>
      <Input
        placeholder="Dias con Covid-19"
        containerStyle={styles.inputForm}
        onChange={(e) => onChangeForm(e, "diasCovid")}
      />
      <Text style={styles.textopregunt}>
        Ha tenido alguna sospecha de estar contagiado o con sintomatologia de
        Covid-19?
      </Text>
       <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Si", myValue: "Si" },
                      { myLabel: "No", myValue: "No" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, sospecha: value })
              }
            />
      <Text style={styles.textopregunt}>
        Tiene o ha tenido fiebre los últimos 14 días?
      </Text>
      <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Si", myValue: "Si" },
                      { myLabel: "No", myValue: "No" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, fiebreDias: value })
              }
            />
      <Text style={styles.textopregunt}>
        Ha tenido problemas respiratorios en los últimos 14 días?
      </Text>
      <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Si", myValue: "Si" },
                      { myLabel: "No", myValue: "No" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, respiratoriosDias: value })
              }
            />
      <Text style={styles.textopregunt}>
        En los últimos 14 días, usted ha presentado alguno de estos síntomas?
      </Text>
      <MultiSelect
          items={data}
          uniqueKey="id"
          selectedItems={selectedSintomas}
          searchInputPlaceholderText="Seleccionar varios si es necesario"
          onSelectedItemsChange={(e) => onSelectedItemsChange(e)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
      /> 
      <Text style={styles.textopregunt}>
        En los últimos 14 días, usted o algún miembro de su grupo familiar,
        social o laboral ha tenido contacto con alguien sospechoso de estar
        contagiado con Covid-19?
      </Text>
      <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Si", myValue: "Si" },
                      { myLabel: "No", myValue: "No" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, sospechosoContagiado: value })
              }
            />
      <Text style={styles.textopregunt}>
        En los últimos 14 días, usted o algún miembro de su grupo familiar,
        social o laboral ha tenido contacto con alguien diagnosticado con
        Covid-19?
      </Text>
      <Selector
              theme="dropdown" // Default: 'simple'
              items={[
                      { myLabel: "Si", myValue: "Si" },
                      { myLabel: "No", myValue: "No" },
                    ]}
              // Specify key
              valueKey="myValue" // Default: 'value'
              labelKey="myLabel" // Default: 'label'
              defaultValue="english" // Set default value
              placeholder="Seleccione" // Placeholder for dropdown UI
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
                setCovidData({ ...covidData, sospechosoFamiliar: value })
              }
            />
      <Text style={styles.textopregunt}>Temperatura °C</Text>
      <Input
        placeholder="Escriba aca su temperatura actual"
        containerStyle={styles.inputForm}
        onChange={(e) => onChangeForm(e, "temperatura")}
      />
      <Button
        title="Enviar Formulario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
    </View>
  );
}


function defaultFormValue() {
  return {
    sede: "",
    diagnosticoCovid: "",
    diasCovid: "",
    sospecha: "",
    fiebreDias: "",
    respiratoriosDias: "",
    sintomas: [],
    sospechosoContagiado: "",
    sospechosoFamiliar: "",
    temperatura: "",
    fechaUpdate: "",
  };
}

const styles = StyleSheet.create({
  selectPuntIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colores.GREEN,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  selectPuntAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colores.GREEN,
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    fontSize: 20,
  },
  itemsSedeTitle: {
    color: Colores.WHITE,
  },
  itemsSede: {
    backgroundColor: Colores.RED,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  inputForm: {
    width: "96%",
    marginTop: 20,
  },
  btnContainer: {
    width: "90%",
  },
  btnLogin: {
    backgroundColor: Colores.GREEN,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  textoback: {
    color: Colores.WHITE,
  },
  textopregunt: {
    textAlign: "justify",
    paddingRight: "4%",
    paddingLeft: "4%",
    padding: "3%",
  },
  textoback: {
    color: Colores.WHITE,
  },
  entreItem: {
    padding: "3%",
  },
});
