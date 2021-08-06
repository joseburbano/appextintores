import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import OrigenFuego from "../screens/Inicio/OrigenFuego";
import ClaseFuego from "../screens/Inicio/ClaseFuego";
import SenalizacionExtintores from "../screens/Inicio/SenalizacionExtintores";
import PrevencionCovid from "../screens/Inicio/PrevencionCovid";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={Home}
        options={{ title: "Inicio", headerTransparent: true, }}
      />
      <Stack.Screen
        name="OrigenFuego"
        component={OrigenFuego}
        options={{ title: "Origen del fuego", headerTransparent: true, }}
      />
      <Stack.Screen
        name="ClaseFuego"
        component={ClaseFuego}
        options={{ title: "Clases de fuego", headerTransparent: true, }}
      />
      <Stack.Screen
        name="SenalizacionExtintores"
        component={SenalizacionExtintores}
        options={{ title: "Señalización", headerTransparent: true, }}
      />
      <Stack.Screen
        name="PrevencionCovid"
        component={PrevencionCovid}
        options={{ title: "Prevención Covid-19", headerTransparent: true, }}
      />
    </Stack.Navigator>
  );
}
