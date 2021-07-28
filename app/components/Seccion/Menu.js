import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import * as RootNavigation from "../../navigation/RootNavigation";
import { map } from "lodash";
import Colores from "../../styles/Colors";

export default function Menu(props) {
  const { datosRol } = props;

  const selectedComponent = (key) => {
    RootNavigation.navigate(key);
  };
  function generateOptionsMenusAdmin(selectedComponent) {
    const user = datosRol;

    if (user === "Administrador") {
      return [
        {
          title: "Extintores",
          iconType: "material-community",
          iconNameLeft: "fire-extinguisher",
          iconColorLeft: Colores.GREEN,
          onPress: () => selectedComponent("Extintores"),
        },
        {
          title: "Condiciones Inseguras",
          iconType: "material-community",
          iconNameLeft: "hand-right",
          iconColorLeft: Colores.GREEN,
          onPress: () => selectedComponent("NormativaParticipacion"),
        },
        {
          title: "Formulario de Covid-19",
          iconType: "material-community",
          iconNameLeft: "bug-check-outline",
          iconColorLeft: Colores.GREEN,
          onPress: () => selectedComponent("Covid"),
        },
      ];
    } else {
      if (user === "Auxiliar") {
        return [
          {
            title: "Extintores Auxiliar",
            iconType: "material-community",
            iconNameLeft: "fire-extinguisher",
            iconColorLeft: Colores.GREEN,
            onPress: () => selectedComponent("Extintores"),
          },
          {
            title: "Condiciones Inseguras",
            iconType: "material-community",
            iconNameLeft: "hand-right",
            iconColorLeft: Colores.GREEN,
            onPress: () => selectedComponent("NormativaParticipacion"),
          },
          {
            title: "Formulario de Covid-19",
            iconType: "material-community",
            iconNameLeft: "bug-check-outline",
            iconColorLeft: Colores.GREEN,
            onPress: () => selectedComponent("Covid"),
          },
        ];
      } else {
        return [
          {
            title: "Extintores User",
            iconType: "material-community",
            iconNameLeft: "fire-extinguisher",
            iconColorLeft: Colores.GREEN,
            onPress: () => selectedComponent("Extintores"),
          },
          {
            title: "Condiciones Inseguras",
            iconType: "material-community",
            iconNameLeft: "hand-right",
            iconColorLeft: Colores.GREEN,
            onPress: () => selectedComponent("NormativaParticipacion"),
          },
          {
            title: "Formulario de Covid-19",
            iconType: "material-community",
            iconNameLeft: "bug-check-outline",
            iconColorLeft: Colores.GREEN,
            onPress: () => selectedComponent("Covid"),
          },
        ];
      }
    }
  }

  const menuOptions = generateOptionsMenusAdmin(selectedComponent);

  return (
    <View>
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
    </View>
  );
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
