import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Création du contexte
const TaskContext = createContext();

// Provider
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Chargement initial
  useEffect(() => {
    loadTasks();
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  };

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

  const addTask = (title) => {
    if (title.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const filteredTasks = tasks
    .filter(item => {
      if (filter === "ACTIVE") return !item.completed;
      if (filter === "DONE") return item.completed;
      return true;
    })
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  const remainingCount = tasks.filter(t => !t.completed).length;

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      filter,
      setFilter,
      search,
      setSearch,
      addTask,
      deleteTask,
      toggleTask,
      remainingCount,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook personnalisé
export function useTaskContext() {
  return useContext(TaskContext);
}
