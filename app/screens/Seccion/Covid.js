import React, { useState, useRef } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CheckBox } from "react-native-elements";
import FormCovid from "../../components/Covid/FormCovid";
import Colores from "../../styles/Colors";

export default function Covid() {
  const [autorizo, setAutorizo] = useState(false);
  const [acepto, setAcepto] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <View>
        <StatusBar backgroundColor={Colores.GREEN} translucent={true} />
        <Text style={styles.titulo}>FORMULARIO DE CONTROL DE COVID-19</Text>
        <Text style={styles.textoPermisos}>
          Autorizo a la Corporación Universitaria del Huila - CORHUILA el
          tratamiento de mis datos personales, incluyendo los de salud que son
          sensibles, con la finalidad de desarrollar acciones de promoción,
          prevención, tratamiento para la gestión de riesgo en salud y/o frente
          a la propagación, contagio y control de COVID-19, acorde con lo
          normado por el Ministerio de Salud y Protección Social y las demás
          autoridades competentes, y para las demás finalidades que se
          encuentran establecidas en la política de privacidad que puede ser
          consultada en la página web https://www.corhuila.edu.co, donde además
          se encuentran los canales de contacto, y la forma de ejercer mis
          derechos a revocar la autorización, conocer, actualizar, rectificar y
          suprimir mi información.Se entiende por tratamiento de datos, la
          facultad que tendrá la Corporación Universitaria del Huila - CORHUILA
          de almacenar, compartir, utilizar, procesar, recolectar, divulgar,
          transferir, transmitir, información relacionada con el estado de
          salud, en cumplimiento de las disposiciones legales.De igual manera
          informo que, en caso de llegar a ingresar a alguna las sedes de la
          institución durante el periodo de la emergencia sanitaria, lo haré de
          manera voluntaria y bajo mi responsabilidad, comprometiéndome a
          cumplir con los protocolos de bioseguridad establecidos por CORHUILA.
        </Text>
        <CheckBox
          title="Autorizo"
          checked={autorizo}
          onPress={() => setAutorizo(!autorizo)}
        />
        {autorizo && (
          <Text style={styles.textoPermisos}>
            1) Cumplir las medidas estipuladas en el Plan de aplicación del
            protocolo de Bioseguridad, de la CORPORACIÓN UNIVERSITARIA DEL HUILA
            – CORHUILA. 2) Autorizar para que me realicen la toma de temperatura
            al ingreso y a la salida, o cuando sea necesario.3) Diligenciar o
            suministrar información clara, veraz y completa sobre mi estado de
            salud, para la prevención y diseminación del COVID-19. 4) Utilizar
            los elementos de protección personal necesarios para la prevención
            ante el COVID-19. 5) Garantizar un distanciamiento de 2 metros entre
            mis compañeros y yo, evitando aglomeraciones. 6) Realizar lavado de
            manos cada 2 horas durante un período de 20 segundos, de acuerdo a
            cada uno de los pasos explicados por el área de Seguridad y Salud en
            el Trabajo. 7) Seguir los protocolos de la manipulación de los
            equipos y herramientas de trabajo, donde se establece la limpieza y
            desinfección a diario de las herramientas, equipos y materiales
            antes, durante y al final de cada uso. 8) No prestar las
            herramientas y equipos a los compañeros ya que es de uso personal.
            9) Cumplir con las medidas de higiene respectivo a la dotación y a
            los elementos de protección personal. 10) Realizar la debida
            clasificación de los residuos generados durante la jornada laboral.
            11) Utilizar vaso individual o termo personal para la hidratación.
            12) No compartir bebidas, alimentos o prendas de vestir a mis
            compañeros de trabajo. 13) Notificar a los responsables del SG SST,
            en caso de presentar alguna sintomatología del COVID-19 (tos, fiebre
            cuantificada mayor o igual a 38°C, fatiga, dolor de garganta y
            dificultad respiratoria, entre otros síntomas de resfriado). 14)
            Reportar al jefe inmediato y/o al responsable de Seguridad y Salud
            en el trabajo cuando por algún motivo haya tenido contacto con un
            familiar, amigo o conocido que al realizarle la prueba esté haya
            sido positivo para COVID-19. 15) Reportar si algún compañero este
            incumpliendo con lo establecido en el protocolo.
          </Text>
        )}
        {autorizo && (
          <CheckBox
            title="Acepto terminos y condiciones"
            checked={acepto}
            onPress={() => setAcepto(!acepto)}
          />
        )}
        {autorizo && (
          <View style={styles.contatiners}>
            {acepto && <FormCovid />}
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  titulo: {
    paddingTop: "1%",
    padding: "3%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  contatiners: {},
  textCate: {
    fontSize: 26,
    color: Colores.WHITE,
  },
  textoPermisos: {
    textAlign: "justify",
    paddingRight: "4%",
    paddingLeft: "4%",
  },
});
