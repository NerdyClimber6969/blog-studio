import { createContext, useState,  useContext } from "react";

const NotificationContext = createContext();

function NotificationProvider(props) {
    const [notifications, setNotifications] = useState([]);

    function removeNotification(id) {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    function handleShowNotifications(messages, type) {
        // Check valid inputs - note the logic was incorrect in the original
        if (!messages || !type) {
            return;
        };
        
        let notificationProps;
        
        if (Array.isArray(messages)) {
            notificationProps = messages.map((message) => ({
                isClosing: false,
                type,
                message,
                id: Date.now() + Math.floor(Math.random() * 100), // Ensure unique IDs
            }));
        } else if (typeof messages === 'string') {
            notificationProps = [{
                isClosing: false,
                type,
                message: messages,
                id: Date.now(),
            }];
        } else {
            return; // Invalid message format
        };
        
        return setNotifications(notificationProps);
    };

    async function handleApiCall(apiCallback, {
        successMessage, 
        errorMessage,
        onSuccess = false,
        onError = false,
        notifySuccess = true,
        notifyError = true,
    }) {
        try {
            const result = await apiCallback();

            if (notifySuccess) {
                handleShowNotifications(successMessage, 'success');
            };

            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(result);
            };
            
            return result;
        } catch (error) {
            if (notifyError) {
                if (notifyError) {
                    handleShowNotifications(errorMessage || error.message, 'error');
                };
            };

            if (onError && typeof onError === 'function') {
                onError(error);
            };

            return null;
        };
    };

    return (
        <NotificationContext.Provider 
            value={{ 
                notifications, 
                setNotifications, 
                removeNotification,
                handleApiCall,
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    )
};

export function useNotifications() {
    return useContext(NotificationContext);
};

export default NotificationProvider;