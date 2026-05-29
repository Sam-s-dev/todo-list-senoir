// utils/helpers.js
// Fonctions utilitaires pour l'application Todo List

// Générer un ID unique basé sur le timestamp
export const generateId = () => Date.now().toString();

// Filtrer les tâches selon le filtre actif
export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case "ACTIVE":
      return tasks.filter((task) => !task.completed);
    case "DONE":
      return tasks.filter((task) => task.completed);
    case "ALL":
    default:
      return tasks;
  }
};

// Rechercher dans les tâches
export const searchTasks = (tasks, query) => {
  if (!query || query.trim() === "") return tasks;
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Compter les tâches restantes (non terminées)
export const countRemaining = (tasks) => {
  return tasks.filter((task) => !task.completed).length;
};

// Créer un objet tâche
export const createTask = (title) => ({
  id: generateId(),
  title: title.trim(),
  completed: false,
});
