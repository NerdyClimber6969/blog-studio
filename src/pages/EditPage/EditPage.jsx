import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/apiService.js';
import Editor from '../../components/Editor/Editor.jsx';
import { useNotifications } from '../../context/NotificationProvider.jsx';
import { useProfile } from '../../context/ProfileProvider.jsx';

function EditPage() {
    const { handleApiCall } = useNotifications();
    const { setPosts } = useProfile();
    const [editor, setEditor] = useState();
    const { postId } = useParams();
    

    useEffect(() => {
        handleApiCall(async () => await API.getPost(postId), { 
            notifySuccess: false, 
            onSuccess: (result) => { 
                setEditor(
                    <Editor 
                        title={result.post.title}
                        content={result.post.content}
                        onSave={handleUpdatePost}
                    />
                )
            }
        });

        return;
    }, [])

    function handleUpdatePost(title, content) {
        handleApiCall(async () => await API.updatePost(postId, {title, content}), { 
            successMessage: 'Updated sucessfully', 
            errorMessage: 'Updated unsucessfully',
            onSuccess: (result) => { 
                setPosts((currentPosts) => currentPosts.map((post) => 
                    post.id === postId ? ({...post, title: result.post.title,}) : (post)
                ));
            }
        });

        return;
    };

    return (
        <main className='edit-page'>
            <h2 className='font-md mb5'>Edit</h2>
            {editor ? (editor) : (<div>loading</div>)}
        </main>
    )
    ;
};

export default EditPage;