import { useState, useEffect } from 'react';
import API from '../services/apiService.js';
import { useNotifications } from '../context/NotificationProvider.jsx';

function usePost(postId) {
    const [initialLoading, setInitialLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [post, setPost] = useState();
    const [saveStatus, setSaveStatus] = useState();
    const [error, setError] = useState();
    const { handleApiCall } = useNotifications();

    useEffect(() => {
        const fetchPost = async () => {
            setPost(null);
            setError(null);
            setInitialLoading(true);

            await handleApiCall(() => API.getPost(postId), {
                notifySuccess: false,
                notifyError: true,
                onSuccess: (response) => {
                    setPost(response.post);
                    setSaveStatus({ postContent: true, thumbnail: true });
                },
                onError: (error) => setError(error)
            });

            setInitialLoading(false);
        };

        fetchPost();
    }, [])


    async function savePostContent({ title, content, summary, status }) {
        await handleApiCall(() => API.updatePost(postId, { title, content, summary, status }), { 
            successMessage: 'Content Updated Sucessfully',
            errorMessage: 'Content Updated Unsucessfully',
            onSuccess: (response) => {
                setPost({ ...response.post, thumbnailURL: post.thumbnailURL });
                setSaveStatus({ ...saveStatus, postContent: true });
            },
            onError: (error) => setError(error)
        });
    };

    async function saveThumbnail(postId, formData) {
        await handleApiCall(() => API.updateThumbnail(postId, formData), {
            successMessage: 'Thumbnail Updated Sucessfully',
            errorMessage: 'Thumbnail Updated Unsucessfully',
            onSuccess: (response) => {
                setPost({ ...post, thumbnailURL: response.thumbnailUrl })
                setSaveStatus({ ...saveStatus, thumbnail: true });
            },
            onError: (error) => setError(error)
        });
    };

    return { 
        post, setPost,
        initialLoading, 
        updateLoading, setUpdateLoading,
        error, setError, 
        savePostContent, saveThumbnail,
        saveStatus, setSaveStatus
    }
};

export default usePost;