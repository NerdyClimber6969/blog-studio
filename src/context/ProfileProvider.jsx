import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../services/apiService.js';

const ProfileContext = createContext();

function ProfileProvider({ children }) {
    const [summary, setSummary] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        const json = await API.getProfile();
        if (!json.success) {
            return handleSetNotifications(json.errors.map((error) => (
                createNotification(error.message, 'error')
            )));
        };
        const { profile: { posts, comments } } = json;

        setSummary({
            posts: {
                quantity: posts.length,
                published: posts.reduce(
                    (count, post) => (post.status === 'published' ? count + 1 : count),
                    0
                ),
                drafted: posts.reduce(
                    (count, post) => (post.status === 'drafted' ? count + 1 : count),
                    0
                ),
                dislike: posts.reduce(
                    (count, post) => (count + post.dislike),
                    0
                ),
                like: posts.reduce(
                    (count, post) => (count + post.like),
                    0
                ),
            },
            comments: {
                quantity: comments.length,
                dislike: comments.reduce(
                    (count, comment) => (count + comment.dislike),
                    0
                ),
                like: posts.reduce(
                    (count, comment) => (count + comment.like),
                    0
                ),
            }
        });
        setPosts(posts);
        setComments(comments);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ 
            summary, 
            setSummary,
            posts,
            setPosts, 
            comments, 
            setComments,
            loading
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

function useProfile() {
    return useContext(ProfileContext);
};

export { ProfileProvider as default, useProfile };