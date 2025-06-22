import { useState, useEffect, useCallback } from 'react';
import API from '../services/apiService.js';
import { useNotifications } from '../context/NotificationProvider.jsx';

function useSummary() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState();
    const [error, setError] = useState();
    const { handleApiCall } = useNotifications();

    const fetchSummary = useCallback(async () => {
            setError(null);
            setSummary(null);
            setLoading(true);

            await handleApiCall(() => API.getSummary(), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => setSummary({ post: response.post, comment: response.comment }),
                onError: (error) => setError(error)
            });

            setLoading(false);
    }, []);

    useEffect(() => {
        fetchSummary();
    }, []);

    return { summary, setSummary, loading, error, setError };
};

export default useSummary;