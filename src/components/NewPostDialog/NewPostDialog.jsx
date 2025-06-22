import { useState, useCallback } from 'react';
import Input from '../Input/Input.jsx';
import Dialog from '../Dialog/Dialog.jsx';
import SpinningLoader  from '../SpinningLoader/SpinningLoader.jsx';
import styles from './NewPostDialog.module.css';

function NewPostDialog({ isOpen, onSubmit, onClose }) {
    const [title, setTitle] = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const validateInput = useCallback((newTitle) => newTitle !== '', []);
    
    function handleInputChange(e) {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSubmitBtnDisabled(!validateInput(newTitle));
    };

    async function handleSubmit(e) {
        if (!validateInput()) return;
        e.preventDefault();
        setLoading(true);
        setTitle('');
        await onSubmit(title);
        setLoading(false);
        return;
    };

    function handleClose(e) {
        e.preventDefault();
        setTitle('');
        onClose();
        return;
    };

    return (
        <Dialog
            className={styles.newPostDialog}
            isOpen={isOpen}
            title='Create New Post'
            confirmBtn='Add Post'
            confirmBtnDisabled={submitBtnDisabled || loading}
            cancelBtn='Cancel'
            cancelBtnDisabled={loading}
            showCloseButton={!loading}
            onConfirm={(e) => handleSubmit(e)}
            onClose={(e) => handleClose(e)}
        >   
            {loading ? (
                <div className={styles.loaderContainer}>
                    <SpinningLoader size='medium'/>
                </div>
            ) : (
                <form>
                    <Input
                        label='Title'
                        id='title'
                        name='title'
                        type='text'
                        placeholder='Title'
                        errorMessage='Title is required'
                        value={title}
                        required
                        onChange={(e) => handleInputChange(e)}
                    />
                </form>
            )}
        </Dialog>
    );
};

export default NewPostDialog;