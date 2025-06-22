import { useState, useEffect, useCallback } from 'react';
import API from '../services/apiService.js';
import { useNotifications } from '../context/NotificationProvider.jsx';

function useComments(searchParams) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const { handleApiCall } = useNotifications();

    const fetchComments = useCallback(async (searchParams) => {
        setLoading(true);
        setData(null);
        setError(null);

        await handleApiCall(() => API.getComments(searchParams), {
            notifySuccess: false,
            notifyError: true,
            onSuccess: (response) => {
                setData({ 
                    total: response.total, 
                    comments: response.comments.map((cmt) => ({ ...cmt, loading: false }))
                });
            },
            onError: (error) => setError(error)
        });

        setLoading(false);
    }, []);

    const deleteComment = useCallback(async(commentToDelete) => {
        setData((current) => ({
            comments: current.comments.map((comment) => 
                comment.id === commentToDelete.id ? { ...comment, loading: true } : comment
            ),
            total: current.total,
        }));

        await handleApiCall(() => API.deleteComment(commentToDelete.id), {
            successMessage:'Comment deleted',
            onSuccess: () => setData((current) => ({
                comments: current.comments.filter((comment) => comment.id !== commentToDelete.id),
                total: current.total - 1,
            })),
            onError: (error) => {
                setData((current) => ({
                    comments: current.comments.map((comment) => 
                        comment.id === commentToDelete.id ? { ...comment, loading: false } : comment
                    ),
                    total: current.total,
                }));
                setError(error);
            }
        });

        return;
    }, []);

    useEffect(() => {
        fetchComments(searchParams);
    }, [searchParams])

    return {
        total: data?.total,
        comments: data?.comments,
        deleteComment,
        loading,
        error
    };
};

export default useComments;