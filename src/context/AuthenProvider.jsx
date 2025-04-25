import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications} from './NotificationProvider.jsx';
import API from '../services/apiService.js';

const AuthenContext = createContext();

function AuthenProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const { handleApiCall, setNotifications } = useNotifications();
    const navigate = useNavigate();

    const verifyToken = async () => {
        console.log('verifying')
        await handleApiCall(() => API.verify(), {
            notifySuccess: false,
            notifyError: false,
            onSuccess: (response) => {
                setUser(response.username);
                setIsAuthenticated(true);
                setInitialized(true);
            },
            onError: (error, infos) => {
                setUser(null);
                setIsAuthenticated(false);

                const [ { message } ] = infos; 
                if (message === 'Expired token') {
                    return handleLogout();
                } else if (message === 'Invalid expired' || message === 'No token found') {
                    return setNotifications({
                        message: message,
                        id: Date.now(),
                        isClosing: false,
                        type: 'error'
                    })
                };

                return;
            }
        });

        return;
    };

    async function handleLogout(path='/', message='You have been safely logged out.') {
        await handleApiCall(async () => await API.logout(), {
            successMessage: message,
            onSuccess: () => {
                setUser(null);
                setIsAuthenticated(false);
                return navigate(path)
            }
        });
    };

    // Initial check on page load
    useEffect(() => {
        verifyToken();
    }, []);


    useEffect(() => {
        let timerId;

        if (isAuthenticated) {
            //Run every 5 minutes
            timerId = setInterval(() => verifyToken, 1000 * 60 * 5); 
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
            handleLogout,
            initialized,
            isAuthenticated,
            setIsAuthenticated
        }}>
            { children }
        </AuthenContext.Provider>
    );  
};

function useAuthen() {
    const authenContext = useContext(AuthenContext);

    // Return combined context with navigation functions
    return {
        ...authenContext
    };
};

export { AuthenProvider as default, useAuthen };