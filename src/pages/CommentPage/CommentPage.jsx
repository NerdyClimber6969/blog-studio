import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import useComments from '../../hook/useComments.jsx';

import RecordCard from '../../components/RecordCard/RecordCard.jsx';
import DeleteIcon from '../../icons/DeleteIcon.jsx';
import Filter from '../../components/Filter/Filter.jsx';

import useDialogManager from '../../hook/useDialogManager.jsx';
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog.jsx';

import btnStyles from '../../components/Button/Button.module.css';
import pageStyles from './CommentPage.module.css'

import { updateSearchParams } from '../../utils/searchParamsUtils';

function CommentPage(props) {
    const [searchParams, setSearchParams] = useSearchParams({ orderBy: 'createdAt', orderDir: 'desc' });
    const { loading, comments, deleteComment, error } = useComments(searchParams);
    const { CurrentDialog, openDialog, closeDialog } = useDialogManager({
        'deleteDialog': DeleteDialog
    });

    const handleFilterChange = useCallback((filterUpdates) => {
        setSearchParams((prev) => {
            const newfilter = updateSearchParams(prev, {
                ...filterUpdates,
            })

            return newfilter
        })
    }, [searchParams]);
    
    const handleDelete = useCallback(async (commentToDelete) => {
        closeDialog();
        await deleteComment(commentToDelete);
        return
    }, []);

    return (
        <>
            {CurrentDialog && <CurrentDialog/>}
            <main className={pageStyles.commentPage}>
                {loading && <p className='font-sm'>Loading...</p>}
                {!loading && error && <p className='font-sm'>Error occured when fetch posts...</p>}
                {!loading && comments && (
                    <>  
                        <header className='mb4'>
                            <h2 className='font-md mb4'>Comments</h2>      
                            <Filter 
                                filters={{
                                    search: searchParams.get('search') || '',
                                    sort: `${searchParams.get('orderBy')}:${searchParams.get('orderDir')}`,
                                }}
                                onFilterChange={handleFilterChange}
                                useStatus={false}
                            /> 
                        </header>
                        
                        {comments.length > 0  ? (
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
                                                    onClick={() => openDialog('deleteDialog', { onConfirm: () => handleDelete(comment)})}
                                                >
                                                    <DeleteIcon className='svg-icon'/>
                                                </button>
                                            </div>  
                                        )}
                                    />
                                ))}
                            </div>                                
                        ) : (
                            <div>No Comment Yet</div>
                        )}                         
                    </>                  
                )}
            </main>            
        </>    
    );
};

export default CommentPage;