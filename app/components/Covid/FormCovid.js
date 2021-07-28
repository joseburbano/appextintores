import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { getAccessTokenApi } from "../../api/auth";
import MultiSelect from "multi-select-react-native";
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

  const onChangeForm = (e, type) => {
    setCovidData({ ...covidData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    setCovidData({ ...covidData, sintomas: selectedSintomas });
    if (
      isEmpty(covidData.sede) ||
      isEmpty(covidData.diagnosticoCovid) ||
      isEmpty(covidData.diasCovid) ||
      isEmpty(covidData.sospecha) ||
      isEmpty(covidData.fiebreDias) ||
      isEmpty(covidData.sintomas) ||
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
        var usuarioid = await AsyncStorage.getItem("id");
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
      title: "Molestias y dolores",
      isChecked: false,
    },
    {
      id: "Dolor de garganta",
      title: "Dolor de garganta",
      isChecked: false,
    },
    { id: "Diarrea", title: "Diarrea", isChecked: false },
    { id: "Conjuntivitis", title: "Conjuntivitis", isChecked: false },
    {
      id: "Dolor de cabeza",
      title: "Dolor de cabeza",
      isChecked: false,
    },
    {
      id: "Pérdida del sentido del olfato o del gusto",
      title: "Pérdida del sentido del olfato o del gusto",
      isChecked: false,
    },
    {
      id:
        "Erupciones cutáneas o pérdida de color en los dedos de las manos o de los pies",
      title:
        "Erupciones cutáneas o pérdida de color en los dedos de las manos o de los pies",
      isChecked: false,
    },
    {
      id: "Ninguna de las anteriores",
      title: "Ninguna de las anteriores",
      isChecked: false,
    },
  ];

  return (
    <View style={styles.formContainer}>
      <Text style={styles.textopregunt}>Seleccione sede</Text>
      <RNPickerSelect
        placeholder={placeholderSede}
        onValueChange={(value) => setCovidData({ ...covidData, sede: value })}
        items={[
          { label: "Sede Prado Alto", value: "Sede Prado Alto" },
          { label: "Sede Quirinal", value: "Sede Quirinal" },
          { label: "Sede Pitalito", value: "Sede Pitalito" },
          { label: "Sede Palermo", value: "Sede Palermo" },
          { label: "Sede Rivera", value: "Sede Rivera" },
          { label: "Trabajo en casa", value: "Trabajo en casa" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
      />
      <Text style={styles.textopregunt}>
        ¿Ha tenido alguno de los siguientes enunciados?
      </Text>
      <RNPickerSelect
        placeholder={placeholderDiagnostico}
        onValueChange={(value) =>
          setCovidData({ ...covidData, diagnosticoCovid: value })
        }
        items={[
          { label: "Si", value: "Si" },
          { label: "No", value: "No" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
      />
      <Text style={styles.textopregunt}>
        Si tuvo Covid 19 y esta en proceso de recuperación ¿Cuantos días han
        pasado desde que cumplió su proceso de cuarentena ?
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
      <RNPickerSelect
        placeholder={placeholderSospecha}
        onValueChange={(value) =>
          setCovidData({ ...covidData, sospecha: value })
        }
        items={[
          { label: "Si", value: "Si" },
          { label: "No", value: "No" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
      />
      <Text style={styles.textopregunt}>
        Tiene o ha tenido fiebre los últimos 14 días?
      </Text>
      <RNPickerSelect
        placeholder={placeholderDias}
        onValueChange={(value) =>
          setCovidData({ ...covidData, fiebreDias: value })
        }
        items={[
          { label: "Si", value: "Si" },
          { label: "No", value: "No" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
      />
      <Text style={styles.textopregunt}>
        Ha tenido problemas respiratorios en los últimos 14 días?
      </Text>
      <RNPickerSelect
        placeholder={placeholderRespiratorios}
        onValueChange={(value) =>
          setCovidData({ ...covidData, respiratoriosDias: value })
        }
        items={[
          { label: "Si", value: "Si" },
          { label: "No", value: "No" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
      />
      <Text style={styles.textopregunt}>
        En los últimos 14 días, usted ha presentado alguno de estos síntomas?
      </Text>
      <MultiSelect
        data={data}
        selectedItems={selectedSintomas}
        setSelectedItems={setSelectedSintomas}
        componentStyle={styles.centeredView}
      />
      <Text style={styles.textopregunt}>
        En los últimos 14 días, usted o algún miembro de su grupo familiar,
        social o laboral ha tenido contacto con alguien sospechoso de estar
        contagiado con Covid-19?
      </Text>
      <RNPickerSelect
        placeholder={placeholderSospechososContagiados}
        onValueChange={(value) =>
          setCovidData({ ...covidData, sospechosoContagiado: value })
        }
        items={[
          { label: "Si", value: "Si" },
          { label: "No", value: "No" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
      />
      <Text style={styles.textopregunt}>
        En los últimos 14 días, usted o algún miembro de su grupo familiar,
        social o laboral ha tenido contacto con alguien diagnosticado con
        Covid-19?
      </Text>
      <RNPickerSelect
        placeholder={placeholderSospechososContagiados}
        onValueChange={(value) =>
          setCovidData({ ...covidData, sospechosoFamiliar: value })
        }
        items={[
          { label: "Si", value: "Si" },
          { label: "No", value: "No" },
        ]}
        style={
          Platform.OS === "ios"
            ? styles.selectPuntIOS
            : styles.selectPuntAndroid
        }
        useNativeAndroidPickerStyle={true}
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

const placeholderSospechososContagiados = {
  label: "Familiar sospechoso...",
  value: null,
  color: Colores.GREEN,
};
const placeholderRespiratorios = {
  label: "a tenido problemas respiratorios...",
  value: null,
  color: Colores.GREEN,
};
const placeholderDias = {
  label: "a tenido fiebre...",
  value: null,
  color: Colores.GREEN,
};
const placeholderSede = {
  label: "Select a sede...",
  value: null,
  color: Colores.GREEN,
};
const placeholderSospecha = {
  label: "Sospecha?...",
  value: null,
  color: Colores.GREEN,
};
const placeholderDiagnostico = {
  label: "Ha sido diagnosticado con Covid-19?",
  value: null,
  color: Colores.GREEN,
};

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
});
