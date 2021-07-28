import React from "react";
import {View, Text, StyleSheet} from "react-native"
export default function Version () {
    
return (
<View style={StyleVersion.imagen}>
<Text style={StyleVersion.version}>Version Beta 1.0</Text>
</View>
)
}

const StyleVersion = StyleSheet.create({
   
    imagen: {
      justifyContent: "center",
      alignItems: "center",
    },

    version: {
      paddingTop: "9%",
      fontStyle:"italic"
      
    }
  });
  