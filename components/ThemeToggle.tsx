"use client";

import { useTheme } from "next-themes";
import { Lightbulb, LightbulbOff } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md transition-all duration-300 hover:bg-borderL dark:hover:bg-borderD"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <LightbulbOff />
            ) : (
                <Lightbulb />
            )}
        </button>
    );
}
