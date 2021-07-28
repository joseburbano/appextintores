import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "../components/Seccion/Menu";

export default function Seccion() {
  const [datosRol, setDatoRol] = useState(null);

  useEffect(() => {
    (async () => {
      const rolUser = await AsyncStorage.getItem("rol");
      setDatoRol(rolUser);
    })();
  }, []);

  return (
    <View>
      <Menu datosRol={datosRol} />
    </View>
  );
}
