import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingApi from "../../components/LoadingApi";
import CondicionInseguraForm from "../../components/CondicionInsegura/CondicionInseguraForm";

export default function NormativaParticipacion() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
      (async () => {
        const idUser = await AsyncStorage.getItem("@id");
        setUserId(idUser);
      })();
  }, []);

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.espa}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  espa:{
    paddingTop: 100,
  },
  titulo: {
    paddingTop: "3%",
    padding: "6%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
