import { useState, useEffect, createContext, useContext } from 'react';
import { useNotifications} from './NotificationProvider.jsx';
import API from '../services/apiService.js';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { handleApiCall } = useNotifications();

    const verifyToken = async () => {
        try {
            await handleApiCall(() => API.verify(), {
                notifySuccess: false,
                notifyError: false,
                onSuccess: (response) => {
                    setUser(response.username);
                    setIsAuthenticated(true);
                },
                onError: (error) => {
                    logout();
                }
            });
        } finally {
            setLoading(false);
        };

        return;
    };

    async function logout() {
        await handleApiCall(() => API.logout(), {
            notifySuccess: false,
            notifyError: true,
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                return;
            }
        });

        setLoading(false);
    };

    useEffect(() => {
        // Initial check on page load
        verifyToken();       
    }, []);

    useEffect(() => {
        let timerId;

        if (isAuthenticated) {
            //Run every 5 minutes
            timerId = setInterval(verifyToken, 1000 * 60 * 5); 
        };
        
        return () => {
            if (timerId) {
                clearInterval(timerId);
            };
        };
    }, [isAuthenticated]);

    return (
        <AuthenContext.Provider value={{
            user, 
            setUser, 
            logout,
            isAuthenticated,
            setIsAuthenticated,
        }}> 
            {loading ? (
                <div>Loading</div>
            ) : (
                children
            )}
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