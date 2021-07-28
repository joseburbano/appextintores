import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { getAvatarExtintorApi } from "../../api/extintor";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Colores from "../../styles/Colors";

export default function CardExtintores(props) {
  const { extintores, handleLoadMore, isLoading } = props;
  
  const navigation = useNavigation();

  return (
    <View>
      {size(extintores) > 0 ? (
        <FlatList
          data={extintores}
          renderItem={(extintor) => (
            <Extintore extintor={extintor} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderExtintores}>
          <ActivityIndicator size="large" color={Colores.GREEN} />
          <Text>Cargando Extintores</Text>
        </View>
      )}
    </View>
  );
}

function Extintore(props) {
  const { extintor, navigation } = props;
  const {
    item: { foto, placa, fechaVencimiento, estado, observaciones, _id },
  } = extintor;
  const [imagenFoto, setImagenFoto] = useState(null);

  //traer imagen
  useEffect(() => {
    (async () => {
      const fotoo = await getAvatarExtintorApi(foto);
      setImagenFoto(fotoo);
    })();
  }, [extintor]);

  const goExtintor = () => {
    navigation.navigate("ExtintorInfo", { _id, placa });
  };

  var fechad = moment(fechaVencimiento).format("DD/MM/YYYY");

  return (
    <View>
      <TouchableOpacity onPress={goExtintor}>
        <View style={styles.viewExtintor}>
          <View style={styles.viewExtintorImage}>
            <Image
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator color={Colores.GREEN} />}
              source={
                imagenFoto
                  ? { uri: imagenFoto }
                  : require("../../../assets/image/png/no-imagen.png")
              }
              style={styles.imageExtintor}
            />
          </View>
          <View>
            <Text style={styles.extintorPlaca}>{placa}</Text>
            <Text style={styles.extintorFecha}>{fechad}</Text>
            <Text style={styles.extintorFecha}>{estado}</Text>
            <Text style={styles.extintorObservaciones}>
              {observaciones.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderExtintores}>
        <ActivityIndicator size="large" color={Colores.GREEN} />
      </View>
    );
  } else {
    return (
      <View style={styles.notFountExtintores}>
        <Text>No quedan extintores por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderExtintores: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewExtintor: {
    flexDirection: "row",
    margin: 10,
  },
  viewExtintorImage: {
    marginRight: 15,
  },
  imageExtintor: {
    width: 80,
    height: 80,
  },
  extintorPlaca: {
    fontWeight: "bold",
  },
  extintorFecha: {
    paddingTop: 2,
    color: Colores.GRAY2,
  },
  extintorObservaciones: {
    paddingTop: 2,
    color: Colores.GRAY2,
    width: 300,
  },
  notFountExtintores: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
