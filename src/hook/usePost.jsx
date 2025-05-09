import { useState, useEffect } from 'react';
import API from '../services/apiService.js';
import { useNotifications } from '../context/NotificationProvider.jsx';

function usePost(postId) {
    const [initialLoading, setInitialLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [post, setPost] = useState();
    const [error, setError] = useState();
    const { handleApiCall } = useNotifications();

    useEffect(() => {
        const fetchPost = async () => {
            await handleApiCall(() => API.getPost(postId), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {
                    setPost(response.post);
                    setInitialLoading(false);
                },
                onError: (error) => setError(error)
            });

            return;
        };

        fetchPost();
    }, [])


    async function handlePostUpdate({ title, content, summary, status }) {
        setError(null);
        setUpdateLoading(true);

        await handleApiCall(() => API.updatePost(postId, { title, content, summary, status }), { 
            successMessage: 'Updated successfully', 
            errorMessage: 'Update unsuccessful',
            onSuccess: (response) => setPost(response.post),
            onError: (error) => setError(error)
        });

        setUpdateLoading(false);

        return;
    };

    return { 
        post, 
        setPost,
        initialLoading, 
        updateLoading, 
        error, 
        setError, 
        handlePostUpdate 
    }
};

export default usePost;