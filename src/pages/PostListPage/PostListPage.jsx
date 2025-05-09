import { useCallback } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';

import usePostsMetaData from '../../hook/usePostsMetaData.jsx';

import RecordCard from '../../components/RecordCard/RecordCard.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import EditIcon from '../../icons/EditIcon.jsx';
import DeleteIcon from '../../icons/DeleteIcon.jsx'

import useDialogManager from '../../hook/useDialogManager.jsx';
import NewPostDialog from '../../components/NewPostDialog/NewPostDialog.jsx';
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog.jsx';

import btnStyles from '../../components/Button/Button.module.css'
import pageStyles from './PostListPage.module.css'

import { updateSearchParams } from '../../utils/searchParamsUtils.js';

function PostListPage(props) {
    const [searchParams, setSearchParams] = useSearchParams({ orderBy: 'createdAt', orderDir: 'desc' });
    const { loading, posts, addPost, deletePost, error } = usePostsMetaData(searchParams);
    const { CurrentDialog, openDialog,  closeDialog } = useDialogManager({
        'newPostDialog': NewPostDialog,
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

    const handleSubmit = useCallback(async (title) => {
        closeDialog();
        await addPost(title)
        return;
    }, []);

    const handleDelete = useCallback(async (postToDelete) => {
        closeDialog();
        await deletePost(postToDelete);
        return
    }, []);

    return (
        <>  
            {CurrentDialog && <CurrentDialog/>}
            <main className={pageStyles.postListPage}>
                {loading && <p className='font-sm'>Loading...</p>}
                {!loading && error && <p className='font-sm'>Error occured when fetching ...</p>}
                {!loading && posts && (
                    <>
                        <header className='mb4'>
                            <div>
                                <h2 className='font-md'>Posts</h2>
                                <button 
                                    className={`${btnStyles.primary} font-xs`} 
                                    onClick={() => openDialog('newPostDialog', { onSubmit: handleSubmit })}
                                >
                                        <span className='font-lg'>+</span> Create New Post
                                </button> 
                            </div>
                            <Filter 
                                filters={{
                                    search: searchParams.get('search') || '',
                                    sort: `${searchParams.get('orderBy')}:${searchParams.get('orderDir')}`,
                                    status: searchParams.get('status') || ''
                                }}
                                onFilterChange={handleFilterChange}
                            />
                        </header>

                        {(posts.length > 0 ) ? (
                            <>
                                <div>                           
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
                            </>                     
                        ) : (
                            <div>No Post Yet!!</div>
                        )}                        
                    </>
                )}               
            </main>
        </>
    );
};

export default PostListPage;