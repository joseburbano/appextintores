import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Seccion from "../screens/Seccion";
import Extintores from "../screens/Seccion/Extintores";
import NormativaParticipacion from "../screens/Seccion/NormativaParticipacion";
import Covid from "../screens/Seccion/Covid";
import ExtintorInfo from "../screens/Seccion/ExtintorInfo";
import Consulta from "../screens/Seccion/Consulta";

const Stack = createStackNavigator();

export default function SeccionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Seccion"
        component={Seccion}
        options={{ title: "Sección" }}
      />
       <Stack.Screen
        name="Extintores"
        component={Extintores}
        options={{ title: "Extintores" }}
      />
      <Stack.Screen
        name="NormativaParticipacion"
        component={NormativaParticipacion}
        options={{ title: "Condición Insegura" }}
      />
      <Stack.Screen
        name="Covid"
        component={Covid}
        options={{ title: "Formulario Covid-19" }}
      />
       <Stack.Screen
        name="Consulta"
        component={Consulta}
        options={{ title: "Extintores" }}
      />
      <Stack.Screen
        name="ExtintorInfo"
        component={ExtintorInfo}
        options={{ title: "Información del extintor" }}
      />

    </Stack.Navigator>
  );
}
