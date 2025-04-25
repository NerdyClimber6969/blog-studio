import { createContext, useState,  useContext } from "react";

const NotificationContext = createContext();

function NotificationProvider(props) {
    const [notifications, setNotifications] = useState([]);

    function removeNotification(id) {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    function handleSetNotifications(notifications) {
        if (!notifications || typeof notifications !== 'object') {
            return;
        };

        if (Array.isArray(notifications)) {
            return setNotifications(notifications);
        } else {
            return setNotifications([notifications]);
        };
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
                handleSetNotifications({
                    message: successMessage,
                    id: Date.now(),
                    isClosing: false,
                    type: 'success'
                });
            };

            if (onSuccess) onSuccess(result);
            
            return result;
        } catch (error) {
            const infos = error?.response?.data?.message || error?.errors || error.message || errorMessage;

            if (notifyError) {
                const baseNotificationObj = { isClosing: false, type: 'error' }

                if (Array.isArray(infos)) {
                    handleSetNotifications(infos.map((result) => ({
                        ...baseNotificationObj,
                        message: result.msg || result.message,
                        id: Date.now(),
                    })));
                } else {
                    handleSetNotifications({
                        ...baseNotificationObj, 
                        message: infos,
                        id: Date.now(),
                    });
                };
            };

            if (onError) onError(error, infos);

            return null;
        };
    };

    return (
        <NotificationContext.Provider 
            value={{ 
                notifications, 
                setNotifications, 
                removeNotification, 
                handleApiCall 
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};

export function useNotifications() {
    return useContext(NotificationContext);
};

export default NotificationProvider;