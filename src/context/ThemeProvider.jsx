import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme
        } else {
            return 'light'
        };
    }); 

    function handleSetTheme(theme) {
        localStorage.setItem('theme', theme); 
        setTheme(theme);   
    };

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
