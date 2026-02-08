import { Moon,Sun } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeToggle = () => {
    const{theme,toggleTheme} = useThemeStore()
    return (
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400"/>
               
            ): (
               <Moon className="w-5 h-5 text-black"/>
            )}
        </button>
    )
}

export default ThemeToggle