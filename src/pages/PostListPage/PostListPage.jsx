import { useCallback, useMemo } from 'react';
import { Link, useSearchParams  } from 'react-router-dom';

import usePostsMetaData from '../../hook/usePostsMetaData.jsx';

import RecordCard from '../../components/RecordCard/RecordCard.jsx';
import SearchToolBar from '../../components/SearchToolBar/SearchToolBar.jsx';
import { EditIcon, DeleteIcon } from '../../icons';

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

    const sortOptions = useMemo(() => ([
        { value: 'createdAt:asc', label: 'Date of Creation (Asc)' },
        { value: 'createdAt:desc', label: 'Date of Creation (Desc)' },
        { value: 'title:asc', label: 'Title (Asc)' },
        { value: 'title:desc', label: 'Title (Desc)'}
    ]), [])

    const filterGroups = useMemo(() => ([
        {
            key: 'status',
            label: 'Select Status',
            options: [
                { value: 'published', label: 'Published' },
                { value: 'drafted', label: 'Drafted' },
            ]
        }
    ]), []);

    const handleSearchParamsChange = useCallback((paramUpdates) => {
        setSearchParams((prev) => {
            const newSearchParam = updateSearchParams(prev, {
                ...paramUpdates,
            });

            return newSearchParam;
        })
    }, [searchParams]);

    const handleSubmit = useCallback(async (title) => {
        closeDialog();
        await addPost(title)
    }, []);

    const handleDelete = useCallback(async (postToDelete) => {
        closeDialog();
        await deletePost(postToDelete);
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
                            <SearchToolBar
                                initialParams={{
                                    orderBy: searchParams.get('orderBy'),
                                    orderDir: searchParams.get('orderDir')
                                }}
                                sortOptions={sortOptions}
                                filterGroups={filterGroups}
                                onParamChange={handleSearchParamsChange}
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
                                                <div className='action-container' style={{flexShrink : 0}}>
                                                    <button 
                                                        className={btnStyles.transparent}
                                                        style={{marginRight: 'var(--spacing3)' }}
                                                    >   
                                                        <Link to={`/posts/${post.id}`}><EditIcon/></Link>
                                                    </button>
                                                    <button 
                                                        className={btnStyles.transparent}
                                                        onClick={() => openDialog('deleteDialog', { onConfirm: () => handleDelete(post) })}
                                                    >
                                                        <DeleteIcon/>
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