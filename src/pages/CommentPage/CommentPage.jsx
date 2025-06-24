import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import useComments from '../../hook/useComments.jsx';

import { RecordCard, RecordCardSkeleton } from '../../components/RecordCard/';
import { DeleteIcon } from '../../icons';
import SearchToolBar from '../../components/SearchToolBar/SearchToolBar.jsx';
import { UnexpectedError, ErrorMessage } from '../../components/Error';
import SpinningLoader from '../../components/SpinningLoader/SpinningLoader.jsx';

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

    const sortOptions = useMemo(() => ([
        { value: 'createdAt:asc', label: 'Date of Creation (Asc)' },
        { value: 'createdAt:desc', label: 'Date of Creation (Desc)' },
        { value: 'content:asc', label: 'Content (Asc)' },
        { value: 'content:desc', label: 'Content (Desc)'}
    ]), [])

    const handleSearchParamsChange = useCallback((paramUpdates) => {
        setSearchParams((prev) => {
            const newSearchParam = updateSearchParams(prev, {
                ...paramUpdates,
            });

            return newSearchParam;
        })
    }, [searchParams]);
    
    const handleDelete = useCallback(async (commentToDelete) => {
        closeDialog();
        await deleteComment(commentToDelete);
    }, []);

    return (
        <>
            {CurrentDialog && <CurrentDialog/>}
            <main className={pageStyles.commentPage}>
                {loading && (
                    Array(3).fill().map((_, index) => (
                        <RecordCardSkeleton key={index} className='mb3'/>
                    ))
                )}
                {!loading && error && !comments && <UnexpectedError/>}
                {!loading && !error && comments && (
                    <>  
                        <header className='mb4'>
                            <h2 className='font-md mb4'>Comments</h2>      
                            <SearchToolBar 
                                initialParams={{
                                    orderBy: searchParams.get('orderBy'),
                                    orderDir: searchParams.get('orderDir')
                                }}
                                sortOptions={sortOptions}                                
                                onParamChange={handleSearchParamsChange}
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
                                        renderAction={() => (comment.loading ? (
                                                <SpinningLoader size='small' />
                                            ) : (
                                                <div style={{ flexShrink: 0 }}>
                                                    <button 
                                                        className={btnStyles.transparent}
                                                        onClick={() => openDialog('deleteDialog', { onConfirm: () => handleDelete(comment)})}
                                                    >
                                                        <DeleteIcon/>
                                                    </button>
                                                </div>  
                                            )
                                        )}
                                    />
                                ))}
                            </div>                                
                        ) : (
                            <ErrorMessage 
                                message="You don't have any comment yet"
                                variant='info'
                            />
                        )}                         
                    </>                  
                )}
            </main>            
        </>    
    );
};

export default CommentPage;