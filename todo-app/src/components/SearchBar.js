// components/SearchBar.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Rechercher une tâche..."
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
  },
});
