import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { getExtinIdApi, getAvatarExtintorApi } from "../../api/extintor";
import Loading from "../../components/LoadingApi";
import Extint from "../../components/Extintores/ExtintorForm";
import Carousel from "../../components/Carousel";
import Colores from "../../styles/Colors";
const screenWidth = Dimensions.get("window").width;

export default function ExtintorInfo(props) {
  const { navigation, route } = props;
  const {
    params: { _id, placa },
  } = route;

  useLayoutEffect(() => {
    navigation.setOptions({ title: placa });
  }, [navigation, route]);

  const [extintor, setExtintor] = useState(null);
  const [ftoImage, setFtoImage] = useState(null);
  const [urlima, setUrlima] = useState(null);
  const [realoadExtintorInfo, setRealoadExtintorInfo] = useState(false);

  useEffect(() => {
    (async () => {
      await getExtinIdApi(_id)
        .then((response) => {
          if (response.code === 200) {
            setExtintor(response.extintor);
            setUrlima(response.foto);
          } else {
            if (response.message === "Sesión Invalida") {
              Toast.show({
                text1: "Algo salio mal!",
                text2: `${response.message}`,
              });
              signOut();
            } else {
              Toast.show({
                text1: "Algo salio mal!",
                text2: `${response.message}`,
              });
            }
          }
        })
        .catch(() => {
          Toast.show({
            text1: "Algo salio mal!",
            text2: "Error del servidor o compruebe su conexión a internet.",
          });
        });
    })();
    setRealoadExtintorInfo(false);
  }, [_id, realoadExtintorInfo]);

  useEffect(() => {
    (async () => {
      let fotos = [];
      const fotooo = await getAvatarExtintorApi(urlima);
      fotos.push(fotooo);
      setFtoImage(fotos);
    })();
  }, [urlima]);

  if (!extintor || !ftoImage) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <ScrollView vertical style={styles.viewBody}>
    <View style={styles.espa}>
      <Carousel arrayImages={ftoImage} height={250} width={screenWidth} />
      </View>
      <View>
        <Extint
          extintor={extintor}
          setRealoadExtintorInfo={setRealoadExtintorInfo}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  espa:{
    paddingTop: 100,
  },
  viewBody: {
    flex: 1,
    backgroundColor: Colores.WHITE,
  },
});
