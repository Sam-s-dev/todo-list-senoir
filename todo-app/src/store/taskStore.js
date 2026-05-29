// store/taskStore.js
// Version Zustand — alternative légère à Redux Toolkit
// npm install zustand

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTaskStore = create((set, get) => ({
  tasks: [],
  filter: "ALL",
  search: "",

  // Charger les tâches depuis AsyncStorage
  loadTasks: async () => {
    try {
      const data = await AsyncStorage.getItem("TASKS");
      if (data !== null) {
        set({ tasks: JSON.parse(data) });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // Sauvegarder les tâches dans AsyncStorage
  saveTasks: async () => {
    try {
      await AsyncStorage.setItem("TASKS", JSON.stringify(get().tasks));
    } catch (error) {
      console.log(error);
    }
  },

  // Ajouter une tâche
  addTask: (title) => {
    if (title.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
    get().saveTasks();
  },

  // Supprimer une tâche par ID
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((item) => item.id !== id),
    }));
    get().saveTasks();
  },

  // Toggle statut terminée / non terminée
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
    get().saveTasks();
  },

  // Changer le filtre
  setFilter: (filter) => set({ filter }),

  // Changer la recherche
  setSearch: (search) => set({ search }),

  // Tâches filtrées et recherchées
  getFilteredTasks: () => {
    const { tasks, filter, search } = get();
    return tasks
      .filter((item) => {
        if (filter === "ACTIVE") return !item.completed;
        if (filter === "DONE") return item.completed;
        return true;
      })
      .filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
  },

  // Compteur de tâches restantes
  getRemainingCount: () => {
    return get().tasks.filter((t) => !t.completed).length;
  },
}));

export default useTaskStore;
