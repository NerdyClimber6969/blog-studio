import { useState, useEffect, useCallback } from 'react';
import API from '../services/apiService.js';
import { useNotifications } from '../context/NotificationProvider.jsx';

function usePostsMetaData(searchParams) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const { handleApiCall } = useNotifications();

    const fetchPostsMetaData = useCallback(async (searchParams) => {
        setLoading(true);
        setData(null);
        setError(null);

        await handleApiCall(() => API.getPostsMetaData(searchParams), {
            notifySuccess: false,
            notifyError: true,
            onSuccess: (response) => {
                setData({
                    total: response.total,
                    posts: response.posts.map((post) => ({...post, loading: false }))
                });
            },
            onError: (error) => setError(error)
        });

        setLoading(false);
    }, []);

    const addPost = useCallback(async (title) => {
        await handleApiCall(() => API.createPost(title), {
            successMessage: 'Post created',
            onSuccess: (response) => setData((current) => ({
                posts: [{ ...response.post, loading: false }, ...(current.posts.slice(0, 8))],
                total: current.total + 1,
            }))
        });

        return;
    }, []);

    const deletePost = useCallback(async (postToDelete) => {
        setData((current) => ({
            posts: current.posts.map((post) => 
                post.id === postToDelete.id ? { ...post, loading: true } : post
            ),
            total: current.total,
        }));

        await handleApiCall(() => API.deletePost(postToDelete.id), { 
            successMessage:'Post deleted',
            onSuccess: () => setData((current) => ({
                posts: current.posts.filter((post) => post.id !== postToDelete.id),
                total: current.total - 1,
            })),
            onError: (error) => {
                setData((current) => ({
                    posts: current.posts.map((post) => 
                        post.id === postToDelete.id ? { ...post, loading: false } : post
                    ),
                    total: current.total,
                }));
                setError(error);
            }
        });

        return;
    }, []);

    useEffect(() => {
        fetchPostsMetaData(searchParams);
    }, [searchParams]);

    return {  
        total: data?.total,
        posts: data?.posts, 
        addPost,
        deletePost,
        loading, 
        error 
    };
};

export default usePostsMetaData;