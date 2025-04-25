import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useProfile } from '../../context/ProfileProvider.jsx';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import API from '../../services/apiService.js';

import RecordCard from '../../components/RecordCard/RecordCard.jsx';
import EditIcon from '../../icons/EditIcon.jsx';
import DeleteIcon from '../../icons/DeleteIcon.jsx'

import useDialogManager from '../../hook/useDialogManager.jsx';
import NewPostDialog from '../../components/NewPostDialog/NewPostDialog.jsx';
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog.jsx';

import btnStyles from '../../components/Button/Button.module.css'
import pageStyles from './PostPage.module.css'

function PostPage(props) {
    const { posts, setPosts, setSummary } = useProfile();
    const { handleApiCall } = useNotifications();
    const { CurrentDialog, openDialog,  closeDialog } = useDialogManager({
        'newPostDialog': NewPostDialog,
        'deleteDialog': DeleteDialog
    });

    const handleSubmit = useCallback(async (title) => {
        closeDialog();
        const updateProfile = (response) => {
            setPosts((currentPosts) => ([...currentPosts, response.post]));
            setSummary((current) => ({
                ...current,
                posts: {
                    ...current.posts,
                    quantity: current.posts.quantity + 1,
                    drafted: current.posts.drafted + 1
                }
            }));
        };
        
        await handleApiCall(() => API.createPost({ title }), {
            successMessage: 'Post created',
            onSuccess: updateProfile
        });

        return;
    }, []);

    const handleDelete = useCallback(async (postToDelete) => {
        closeDialog();
        const updateProfile = () => {
            setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postToDelete.id));
            setSummary((current) => ({
                ...current,
                posts: {
                    ...current.posts,
                    published: current.posts.published - (postToDelete.status === 'published' ? 1 : 0),
                    quantity: current.posts.quantity - 1,
                    drafted: current.posts.drafted - (postToDelete.status === 'drafted' ? 1 : 0),
                }
            }));
        };

        handleApiCall(async () => await API.deletePost(postToDelete.id), { 
            successMessage:'Post deleted',
            onSuccess: updateProfile
        });

        return;
    }, [])

    return (
        <>  
            {CurrentDialog && <CurrentDialog/>}
            <main className='post-page'>               
                <header className={`${pageStyles.header} mb4`}>
                    <h2 className='font-md'>Posts</h2>         
                    <button 
                        className={`${btnStyles.primary} font-xs`} 
                        onClick={() => openDialog('newPostDialog', { onSubmit: handleSubmit })}
                    >
                            <span className='font-lg'>+</span> Create New Post
                    </button> 
                </header>
                <div className='posts-wrapper'>
                    {posts.map((post) => (
                        <RecordCard
                            key={post.id}
                            title={post.title}
                            author={post.author.username}
                            text={post.summary}
                            createdAt={new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            like={post.like}
                            dislike={post.dislike}
                            renderAction={() => (
                                <div className='action-container'>
                                    <button 
                                        className={btnStyles.transparent}
                                        style={{marginRight: 'var(--spacing4)'}}
                                    >   
                                        <Link to={`/posts/${post.id}`}><EditIcon className='svg-icon'/></Link>
                                    </button>
                                    <button 
                                        className={btnStyles.transparent}
                                        onClick={() => openDialog('deleteDialog', { onConfirm: () => handleDelete(post) })}
                                    >
                                        <DeleteIcon className='svg-icon'/>
                                    </button>
                                </div>
                            )}
                        />
                    ))}
                </div> 
            </main>
        </>
    );
};

export default PostPage;