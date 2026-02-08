import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "light",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";

      // apply to html tag
      document.documentElement.classList.toggle("dark", newTheme === "dark");

      // persist
      localStorage.setItem("theme", newTheme);

      return { theme: newTheme };
    }),

  initTheme: () => {
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    set({ theme: savedTheme });
  },
}));
