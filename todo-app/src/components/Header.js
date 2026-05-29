// components/Header.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ remaining }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Todo List Senior</Text>
      <Text style={styles.counter}>Tâches restantes : {remaining}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B1F24",
  },
  counter: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontWeight: "bold",
  },
});
