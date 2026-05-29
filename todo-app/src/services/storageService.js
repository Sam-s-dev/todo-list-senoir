// services/storageService.js
// Service centralisé pour la persistance AsyncStorage

import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "TASKS";

// Sauvegarder les tâches
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.log("Erreur sauvegarde:", error);
  }
};

// Charger les tâches
export const loadTasks = async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data !== null ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erreur chargement:", error);
    return [];
  }
};

// Effacer toutes les tâches
export const clearTasks = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.log("Erreur suppression:", error);
  }
};
