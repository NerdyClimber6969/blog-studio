import { useAuthen } from './AuthenProvider.jsx';
import { useNotifications } from './NotificationProvider.jsx';
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/apiService.js';

const ProfileContext = createContext();

function ProfileProvider({ children }) {
    const { isAuthenticated } = useAuthen();
    const { handleApiCall } = useNotifications();
    const [summary, setSummary] = useState();
    const [posts, setPosts] = useState();
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            await handleApiCall(() => API.getProfile(), {
                notifySuccess: false,
                onSuccess: (response) => {
                    const { profile: { posts, comments } } = response;
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
                }
            });
        };

        if (isAuthenticated) {
            fetchProfile();
        }
    }, [isAuthenticated]);

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