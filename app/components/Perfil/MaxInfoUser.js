import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import moment from "moment";
import { map } from "lodash";
import Colores from "../../styles/Colors";

export default function MaxInfoUser(props) {
  const { userInfo } = props;

  const menuOptionsUse = generateOptionsUser(userInfo);
  return (
    <View>
      <Text style={styles.textTitel}>Datos registrados.</Text>
      {map(menuOptionsUse, (menu, index) => (
        <ListItem key={index} bottomDivider containerStyle={styles.menuItem}>
          <Icon
            type={menu.iconType}
            name={menu.icono}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}

function generateOptionsUser(userInfo) {
  const { cedula, tel, tipo, cargo, fechaCreate } = userInfo;
  const fecha = moment(fechaCreate).format("DD/MM/YYYY");
  return [
    {
      title: `Identificación: ${cedula}`,
      iconType: "material-community",
      icono: "account-key",
      iconColorLeft: Colores.GREEN,
    },
    {
      title: `Tipo de Usuario: ${tipo}`,
      iconType: "material-community",
      icono: "folder-account-outline",
      iconColorLeft: Colores.GREEN,
    },
    {
      title: `Cargo: ${cargo}`,
      iconType: "material-community",
      icono: "account-tie",
      iconColorLeft: Colores.GREEN,
    },
    {
      title: `Celular: ${tel}`,
      iconType: "material-community",
      icono: "cellphone-iphone",
      iconColorLeft: Colores.GREEN,
    },
    {
      title: `Fecha de creación: ${fecha}`,
      iconType: "material-community",
      icono: "calendar-month-outline",
      iconColorLeft: Colores.GREEN,
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colores.GREEN,
    backgroundColor: Colores.GRAY2,
  },
  textTitel: {
    padding: "1%",
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
});
