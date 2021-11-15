import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import CardExtintores from "../../components/Extintores/CardExtintores";
import { getSedeBloquePisoApi } from "../../api/extintor";
import Toast from "react-native-toast-message";
import { getAccessTokenApi } from "../../api/auth";

export default function PisoUnoA(props) {
  const { route } = props;
  const {
    params: { bloque, piso, sede },
  } = route;

  const { signOut } = useContext(AuthContext);
  const [extintores, setExtintores] = useState([]);
  const [startExtintores, setStartExtintores] = useState(null);
  const [totalExtintores, setTotalExtintores] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const { estad } = getAccessTokenApi();
  const limit = 12;

  useEffect(() => {
    if (estad) {
      setToken(estad);
    }
  }, [estad]);

  useEffect(() => {
    if (token) {
      (async () => {
        await getSedeBloquePisoApi(token, limit, 1, sede, bloque, piso)
          .then((response) => {
            if (response.code === 200) {
              setExtintores(response.extintores);
              setTotalExtintores(response.total.totalPage);
              setStartExtintores(response.total.pageSize);
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
    }
  }, [token]);

  const handleLoadMore = async () => {
    extintores.length < totalExtintores && setIsLoading(true);
    await getSedeBloquePisoApi(token, limit, 2, sede, bloque, piso+1)
      .then((response) => {
        if (response.code === 200) {
          const rf = response.extintores;
          setTotalExtintores(response.total.totalPage);
          setStartExtintores(response.total.pageSize);
          setExtintores([...extintores, ...rf]);
          setIsLoading(false);
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
  };

  return (
    <View style={styles.espa}>
      {extintores && (
        <CardExtintores
          extintores={extintores}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  espa:{
    paddingTop: 90,
  },
});