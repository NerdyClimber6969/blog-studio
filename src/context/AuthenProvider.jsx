import { useState, useEffect, createContext, useContext } from 'react';
import { useNotifications} from './NotificationProvider.jsx';
import API from '../services/apiService.js';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [logoutTimer, setLogoutTimer] = useState(null);
    const { handleApiCall } = useNotifications();

    const verifyToken = async () => {
        setLoading(true);

        await handleApiCall(() => API.verify(), {
            notifySuccess: false,
            notifyError: false,
            onSuccess: (response) => {
                setUser(response.username);
                setIsAuthenticated(true);
                scheduleLogout(response.exp);
            },
            onError: (error) => {
                handleLogout();
            }
        });
  
        setLoading(false);
    };

    async function handleLogout() {
        await handleApiCall(() => API.logout(), {
            notifySuccess: false,
            notifyError: true,
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                
                clearTimeout(logoutTimer)
                setLogoutTimer(null);

                return;
            }
        });

        setLoading(false);
    };

    function scheduleLogout(exp) {
        const timeRemaining = exp - Date.now();

        if (timeRemaining > 0 && !logoutTimer) {
            const timer = setTimeout(() => { handleLogout() }, timeRemaining);
            setLogoutTimer(timer);
        };
    };

    // Initial check on page load
    useEffect(() => {verifyToken()}, []);

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
            handleLogout,
            isAuthenticated,
            setIsAuthenticated,
            loading
        }}> 
            {children}
        </AuthenContext.Provider>
    );  
};

function useAuthen() {
    const authenContext = useContext(AuthenContext);

    return {
        ...authenContext
    };
};

export { AuthenProvider as default, useAuthen };