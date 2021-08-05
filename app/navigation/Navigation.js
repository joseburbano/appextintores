import React, { useEffect, useState, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./RootNavigation";
import Toast from 'react-native-toast-message';
import { AuthContext } from "../context/AuthContext";
import { Icon } from "react-native-elements";
import Color from "../styles/Colors";
import { useClient } from "../hooks/useToken";

import Cargando from "../screens/Cargando";
import Login from "../screens/Login";
import HomeStack from "./HomeStack";
import SeccionStack from "./SeccionStack";
import CuentaStack from "./CuentaStack";
import {size} from "lodash";

const stac = createStackNavigator();
// login flow
const AuthStack = () => {
  return (
    <stac.Navigator
      initialRouteName="Cargando"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
      headerMode="none"
    >
      <stac.Screen name="Cargando" component={Cargando} />
      <stac.Screen name="Login" component={Login} />
    </stac.Navigator>
  );
};

// drawer use only in authenticated screens
const Tab = createBottomTabNavigator();
const DrawerTab = (props) => {
  const { setCargar, cargar } = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: Color.BLACK,
        activeTintColor: Color.GREEN,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name="Seccion"
        component={SeccionStack}
        options={{ title: "Sección" }}
      />
      <Tab.Screen
        name="Perfil"
        component={CuentaStack}
        setCargar={setCargar}
        cargar={cargar}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [hasToken, setHasToken] = useState(null);
  const { idUser } = useClient();

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        const value = await AsyncStorage.getItem("accessToken");
        setHasToken(value);
      },
      signOut: async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        await AsyncStorage.removeItem("id");
        setHasToken(null);
      },
    }),
    [hasToken]
  );

  useEffect(() => {
    if (idUser) setHasToken(idUser);
  }, [idUser]);
  return (
    <AuthContext.Provider value={authContext}>
      <RootStack.Navigator name={"Root"} headerMode="none">
        {!hasToken ? (
          <RootStack.Screen name={"AuthStack"} component={AuthStack} />
        ) : (
          <RootStack.Screen name={"DrawerTab"} component={DrawerTab} />
        )}
      </RootStack.Navigator>
    </AuthContext.Provider>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "Inicio":
      iconName = "home";
      break;
    case "Seccion":
      iconName = "apps";
      break;
    case "Perfil":
      iconName = "account";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={39} color={color} />
  );
}
