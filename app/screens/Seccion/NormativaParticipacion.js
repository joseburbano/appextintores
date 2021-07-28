import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingApi from "../../components/LoadingApi";
import CondicionInseguraForm from "../../components/CondicionInsegura/CondicionInseguraForm";

export default function NormativaParticipacion() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
      (async () => {
        const idUser = await AsyncStorage.getItem("id");
        setUserId(idUser);
      })();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text style={styles.titulo}>Registrar una condición insegura</Text>
        {userId && (
          <CondicionInseguraForm
            userId={userId}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
        )}
        <LoadingApi text={loadingText} isVisible={loading} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    paddingTop: "3%",
    padding: "6%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
