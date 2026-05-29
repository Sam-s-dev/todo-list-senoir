// components/FilterButtons.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FILTERS = [
  { key: "ALL", label: "Toutes" },
  { key: "ACTIVE", label: "Actives" },
  { key: "DONE", label: "Terminées" },
];

export default function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <View style={styles.filters}>
      {FILTERS.map((f) => (
        <TouchableOpacity key={f.key} onPress={() => onFilterChange(f.key)}>
          <Text
            style={[
              styles.filterText,
              activeFilter === f.key && styles.activeFilter,
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterText: {
    fontSize: 15,
    color: "#555",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeFilter: {
    color: "#0066FF",
    fontWeight: "bold",
    backgroundColor: "#E0EEFF",
  },
});
