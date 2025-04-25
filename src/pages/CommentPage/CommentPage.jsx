import { useCallback } from 'react';

import { useProfile } from '../../context/ProfileProvider';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import API from '../../services/apiService.js';

import RecordCard from '../../components/RecordCard/RecordCard.jsx';
import DeleteIcon from '../../icons/DeleteIcon.jsx';

import useDialogManager from '../../hook/useDialogManager.jsx';
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog.jsx';

import btnStyles from '../../components/Button/Button.module.css';

function CommentPage(props) {
    const { comments, setComments, setSummary,  } = useProfile();
    const { handleApiCall } = useNotifications();
    const { CurrentDialog, openDialog, closeDialog } = useDialogManager({
        'deleteDialog': DeleteDialog
    });

    const handleDeleteComment = useCallback(async(commentToDelete) => {
        closeDialog();
        const updateProfile = () => {
            setComments((currentComments) => currentComments.filter((comment) => comment.id !== commentToDelete.id));
            setSummary((current) => ({
                ...current,
                comments: {
                        ...current.comments,
                        quantity: current.comments.quantity - 1
                    }
                }
            ));
        };

        handleApiCall(async () => await API.deleteComment(commentToDelete.id), {
            successMessage:'Comment deleted',
            onSuccess: updateProfile
        });

        return;
    }, []);

    return (
        <>
            {CurrentDialog && <CurrentDialog/>}
            <main className='comment-page'>
                <h2 className='font-md mb4'>Comments</h2>
                <div>
                    {comments.map((comment) => (
                        <RecordCard
                            key={comment.id}
                            title={comment.post.title}
                            author={comment.post.author.username}
                            text={comment.content}
                            createdAt={new Date(comment.createdAt).toDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            like={comment.like}
                            dislike={comment.dislike}
                            renderAction={() => (
                                <div className='action-container'>
                                    <button 
                                        className={btnStyles.transparent}
                                        onClick={() => openDialog('deleteDialog', { onConfirm: () => handleDeleteComment(comment)})}
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

export default CommentPage;