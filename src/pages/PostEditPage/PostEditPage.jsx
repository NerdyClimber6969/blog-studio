import { useParams } from 'react-router-dom';
import { useRef, useState, useCallback } from 'react';
import Editor from '../../components/Editor/Editor.jsx';
import { UnexpectedError, PageNotFoundError } from '../../components/Error';
import SpinningLoader from '../../components/SpinningLoader/SpinningLoader.jsx';
import usePost from '../../hook/usePost.jsx';
import styles from './PostEditPage.module.css';
import ThumbnailDialog from '../../components/ThumbnailDialog/ThumbnailDialog.jsx';
import btnStyles from '../../components/Button/Button.module.css'
import { useNotifications } from '../../context/NotificationProvider.jsx'

function PostEditPage() {
    const { postId } = useParams();
    const { 
        post, setPost, 
        initialLoading, 
        updateLoading, setUpdateLoading, 
        error, setError,
        savePostContent, saveThumbnail, 
        saveStatus, setSaveStatus
    } = usePost(postId);
    const [thumbnailDialogOpen, setThumbnailDialogOpen] = useState(false);
    const [thumbnailBlob, setThumbnailBlob] = useState();
    const editorRef = useRef();

    const getInvalidFieldMessages = useCallback((error) => {
        if (!error || error.name !== 'ValidationError') return null;

        const messages = {}
        for (const field of error.details.invalidFieldError.fields) {
            messages[field.path] = field.message
        };

        return messages;
    }, []);

    const validationMessages = getInvalidFieldMessages(error);

    function handlePostContentChange(e) {
        setPost({...post, [e.target.name]: e.target.value });

        if (!saveStatus.postContent) {
            return;
        };
        setSaveStatus({ ...saveStatus, postContent: false });
    };

    function handleThumbnailChange(thumbnailBlob) {
        setThumbnailBlob(thumbnailBlob);
        setPost({...post, thumbnailURL: URL.createObjectURL(thumbnailBlob)});

        if (!saveStatus.thumbnail) {
            return;
        };
        setSaveStatus({ ...saveStatus, thumbnail: false });
    };

    function handleEditorChange() {
        if (!saveStatus.postContent) {
            return;
        };
        setSaveStatus({ ...saveStatus, postContent: false });
    };

    async function handleSave() {
        setError(null);
        setUpdateLoading(true);
        editorRef.current.setEditable(false);

        const valueToUpdate = {
            title: post.title,
            content: editorRef.current.getContent(),
            summary: post.summary ,
            status: post.status
        };
        
        const formData = new FormData();
        formData.append('thumbnail', thumbnailBlob)

        try {
            if (!saveStatus.postContent) {
                await savePostContent(valueToUpdate);
            };

            if (!saveStatus.thumbnail) { 
                await saveThumbnail(post.id, formData) 
            };
        } catch (error) {
            console.log(error)
        } finally {
            editorRef.current.setEditable(true);
            setUpdateLoading(false);
        };
    };

    if (!initialLoading && !updateLoading && error) {
        switch (error.name) {
            case 'ResourceNotFoundError':
                return (<PageNotFoundError/>);  
            case 'ValidationError':
                break;
            default:
                return (<UnexpectedError/>)
        };
    };

    return (
        initialLoading ? (
            <div className={styles.loaderContainer}>
                <SpinningLoader/>
            </div>
        ) : (
            <main className={styles.editPage} >  
                {post && (
                    <>                  
                        <h2 className='font-md mb5'>Edit</h2>

                        <div className={`${styles.thumnailContainer} mb6`}>
                            <div>
                                <h3 className='font-sm bold mb4'>Thumbnail</h3>
                                <button 
                                    className={`${btnStyles.primary} font-xs`} 
                                    onClick={() => setThumbnailDialogOpen(true)}
                                    disabled={updateLoading}
                                >
                                    Edit 
                                </button> 
                            </div>
                            {post.thumbnailURL && 
                                <div>
                                    <img  src={post.thumbnailURL}/>
                                </div>
                            }
                            {thumbnailDialogOpen && (
                                <ThumbnailDialog 
                                    isOpen={thumbnailDialogOpen} 
                                    thumbnailURL={post.thumbnailURL}
                                    onClose={() => setThumbnailDialogOpen(false)}
                                    onConfirm={handleThumbnailChange}
                                />
                            )}
                        </div>

                        <div className={`mb6 ${styles.inputContainer}`}>
                            <h3 className='font-sm bold mb2'>Title</h3>
                            <input
                                className='font-sm' 
                                value={post.title}
                                name='title'
                                onChange={(e) => handlePostContentChange(e)}
                                disabled={updateLoading} 
                                required={true}
                            />
                            {validationMessages && <span className='font-xxs'>{validationMessages.title}</span>}
                        </div>

                        <div className={`mb6 ${styles.inputContainer}`}>
                            <h3 className='font-sm bold mb2'>Summary</h3>
                            <input
                                className='font-sm' 
                                value={post.summary}
                                name='summary'
                                onChange={(e) => handlePostContentChange(e)}
                                disabled={updateLoading} 
                            />
                        </div>

                        <div className='mb4'>
                            <h3 className='font-sm bold mb2'>Content</h3>
                            <Editor 
                                content={post.content}
                                ref={editorRef}
                                onChange={handleEditorChange}
                            />
                        </div>

                        <div className={styles.editAction}>
                            <div>
                                <label htmlFor='status' className='font-sm'>Status:</label>
                                <select 
                                    className='font-sm' 
                                    name='status' 
                                    id='status' 
                                    value={post.status} 
                                    onChange={(e) => handlePostContentChange(e)}
                                    disabled={updateLoading} 
                                >
                                    <option value='drafted'>Drafted</option>
                                    <option value='published'>Published</option>
                                    <option value='archived'>Archived</option>
                                </select>
                                {validationMessages && <span className='font-xxs' style={{marginLeft: 'var(--spacing3)'}}>{validationMessages.status}</span>}  
                            </div>  
                            <button 
                                disabled={updateLoading || (saveStatus.postContent && saveStatus.thumbnail)} 
                                onClick={handleSave} 
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </main>
        )        
    );
};

export default PostEditPage;