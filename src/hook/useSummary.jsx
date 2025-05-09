import { useState, useEffect } from 'react';
import API from '../services/apiService.js';
import { useNotifications } from '../context/NotificationProvider.jsx';

function useSummary() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState();
    const [error, setError] = useState();
    const { handleApiCall } = useNotifications();

    useEffect(() => {
        const fetchSummary = async () => {
            await handleApiCall(() => API.getSummary(), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => setSummary({ post: response.post, comment: response.comment }),
                onError: (error) => setError(error)
            });

            setLoading(false);
        };

        setError(null);
        setLoading(true);
        fetchSummary();
    }, []);


    return { summary, setSummary, loading, error, setError };
};

export default useSummary;