import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light'); 

    function handleSetTheme(theme) {
        try {
            // Correct method for setting localStorage
            localStorage.setItem('theme', theme); 
            setTheme(theme);
        } catch (error) {
            console.error('Failed to set theme in localStorage:', error);
        };
    };

    useEffect(() => {
        try {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                setTheme(storedTheme);
            };
        } catch (error) {
            console.error('Failed to retrieve theme from localStorage:', error);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, handleSetTheme}}>
            { children }
        </ThemeContext.Provider>
    );
};

function useTheme() {
    return useContext(ThemeContext);
};

export { ThemeProvider as default, useTheme };
