import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Activer LayoutAnimation sur Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Composant animé pour chaque tâche
function AnimatedTaskItem({ item, onToggle, onDelete }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onDelete(item.id);
    });
  };

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    onToggle(item.id);
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={handleToggle}
      >
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completed,
          ]}
        >
          {item.completed ? "✅ " : "⬜ "}
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={handleDelete}
      >
        <Text style={styles.deleteText}>
          ✕
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  /*
    Chargement initial
    Comme un étudiant qui ouvre Moodle
    et découvre 47 devoirs non rendus.
  */

  useEffect(() => {
    loadTasks();
  }, []);

  /*
    Sauvegarde automatique
    React Native travaille pendant que
    l'étudiant prétend "optimiser le code".
  */

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  // -----------------------------
  // Sauvegarde locale
  // -----------------------------

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(
        "TASKS",
        JSON.stringify(tasks)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------
  // Chargement local
  // -----------------------------

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem("TASKS");

      if (data !== null) {
        setTasks(JSON.parse(data));
      }

    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------
  // Ajouter une tâche
  // -----------------------------

  const addTask = () => {

    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks([newTask, ...tasks]);

    setTask("");

  };

  // -----------------------------
  // Supprimer
  // -----------------------------

  const deleteTask = (id) => {

    const filtered = tasks.filter(
      item => item.id !== id
    );

    setTasks(filtered);
  };

  // -----------------------------
  // Toggle Completed
  // -----------------------------

  const toggleTask = (id) => {

    const updated = tasks.map(item => {

      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }

      return item;

    });

    setTasks(updated);
  };

  // -----------------------------
  // Filtrage
  // -----------------------------

  const filteredTasks = tasks
    .filter(item => {

      if (filter === "ACTIVE") {
        return !item.completed;
      }

      if (filter === "DONE") {
        return item.completed;
      }

      return true;

    })
    .filter(item =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // -----------------------------
  // Render Item
  // -----------------------------

  const renderItem = ({ item }) => (
    <AnimatedTaskItem
      item={item}
      onToggle={toggleTask}
      onDelete={deleteTask}
    />
  );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Todo List Senior
      </Text>

      {/* Recherche */}

      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une tâche..."
        placeholderTextColor="#000000"
        value={search}
        onChangeText={setSearch}
      />

      {/* Ajout */}

      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Ajouter une tâche"
          placeholderTextColor="#000000"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity
          style={styles.addBtn}
          onPress={addTask}
        >
          <Text style={styles.addText}>
            Ajouter
          </Text>
        </TouchableOpacity>

      </View>

      {/* Filtres */}

      <View style={styles.filters}>

        <TouchableOpacity
          onPress={() => setFilter("ALL")}
        >
          <Text style={[styles.filterText, filter === "ALL" && styles.activeFilter]}>Toutes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("ACTIVE")}
        >
          <Text style={[styles.filterText, filter === "ACTIVE" && styles.activeFilter]}>Actives</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("DONE")}
        >
          <Text style={[styles.filterText, filter === "DONE" && styles.activeFilter]}>Terminées</Text>
        </TouchableOpacity>

      </View>

      {/* Liste */}

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
      />

      {/* Footer */}

      <Text style={styles.counter}>
        Tâches restantes :
        {" "}
        {
          tasks.filter(t => !t.completed).length
        }
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6F8"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1B1F24"
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 15
  },

  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    color: "#000"
  },

  addBtn: {
    backgroundColor: "#0066FF",
    padding: 15,
    borderRadius: 10,
    marginLeft: 10
  },

  addText: {
    color: "#FFF",
    fontWeight: "bold"
  },

  searchInput: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 10,
    padding: 12,
    color: "#000"
  },

  card: {
    backgroundColor: "#FFF",
    padding: 18,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  taskText: {
    fontSize: 18,
    color: "#000"
  },

  completed: {
    textDecorationLine: "line-through",
    color: "gray"
  },

  deleteBtn: {
    backgroundColor: "#FF4D4D",
    padding: 10,
    borderRadius: 8
  },

  deleteText: {
    color: "#FFF",
    fontWeight: "bold"
  },

  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
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

  counter: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold"
  }

});
