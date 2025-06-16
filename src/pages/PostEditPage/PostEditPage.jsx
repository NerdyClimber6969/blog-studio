import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Editor from '../../components/Editor/Editor.jsx';
import { UnexpectedError, PageNotFoundError } from '../../components/Error';
import usePost from '../../hook/usePost.jsx';
import styles from './PostEditPage.module.css';

function PostEditPage() {
    const { postId } = useParams();
    const { post, setPost, initialLoading, updateLoading, error, handlePostUpdate } = usePost(postId);
    const editorRef = useRef();


    function handleSave() {
        const valueToUpdate = {
            title: post.title,
            content: editorRef.current.getContent(),
            summary: post.summary ,
            status: post.status
        };

        handlePostUpdate(valueToUpdate);
    };

    if (!initialLoading && !updateLoading && error) {
        switch (error.name) {
            case 'ResourceNotFoundError':
                return (<PageNotFoundError/>);       
            default:
                return (<UnexpectedError/>)
        };
    };

    return (
        <main className={styles.editPage} >  
            {initialLoading && <p className='font-sm'>Loading...</p>}  
            {updateLoading && <p className='font-sm'>Updating...</p>}
            {!initialLoading && !updateLoading && post && (
                <>                  
                    <h2 className='font-md mb5'>Edit</h2>

                    <div className='mb6'>
                        <h3 className='font-sm bold mb2'>Title</h3>
                        <input
                            className='font-sm' 
                            value={post.title}
                            onChange={(e) => setPost({...post, title: e.target.value })}
                        />
                    </div>

                    <div className='mb6'>
                        <h3 className='font-sm bold mb2'>Summary</h3>
                        <input
                            className='font-sm' 
                            value={post.summary}
                            onChange={(e) => setPost({...post, summary: e.target.value })}
                        />
                    </div>

                    <div className='mb4'>
                        <h3 className='font-sm bold mb2'>Content</h3>
                        <Editor 
                            content={post.content}
                            ref={editorRef}
                        />
                    </div>

                    <div>
                        <div>
                            <label htmlFor='status' className='font-sm'>Status:</label>
                            <select 
                                className='font-sm' 
                                name='status' 
                                id='status' 
                                value={post.status} 
                                onChange={(e) => setPost({...post, status: e.target.value })}
                            >
                                <option value='drafted'>Drafted</option>
                                <option value='published'>Published</option>
                                <option value='archived'>Archived</option>
                            </select>
                        </div>  
                        <button onClick={handleSave}>Save</button>
                    </div>
                </>
            )}
        </main>
    );
};

export default PostEditPage;