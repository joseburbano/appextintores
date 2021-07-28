import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import * as RootNavigation from "../../navigation/RootNavigation";
import { map } from "lodash";
import Colores from "../../styles/Colors";

export default function Categoria() {
  const selectedComponent = (key) => {
    RootNavigation.navigate(key);
  };
  const menuOptions = generateOptions(selectedComponent);
  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          bottomDivider
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        >
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={Colores.GREEN} />
        </ListItem>
      ))}
    </View>
  );
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Origen del fuego",
      iconType: "material-community",
      iconNameLeft: "campfire",
      iconColorLeft: Colores.GREEN,
      onPress: () => selectedComponent("OrigenFuego"),
    },
    {
      title: "Clase de fuego",
      iconType: "material-community",
      iconNameLeft: "fire",
      iconColorLeft: Colores.GREEN,
      onPress: () => selectedComponent("ClaseFuego"),
    },
    {
      title: "Señalización de equipos de extintores",
      iconType: "material-community",
      iconNameLeft: "sign-direction",
      iconColorLeft: Colores.GREEN,
      onPress: () => selectedComponent("SenalizacionExtintores"),
    },
    {
      title: "Prevención contención y mitigación del Covid-19",
      iconType: "material-community",
      iconNameLeft: "bacteria",
      iconColorLeft: Colores.GREEN,
      onPress: () => selectedComponent("PrevencionCovid"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colores.GREEN,
  },
  iconRightFle: {
    left: 0,
  },
});
