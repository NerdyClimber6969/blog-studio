import { useState, useCallback } from 'react';
import Input from '../Input/Input.jsx';
import Dialog from '../Dialog/Dialog.jsx';

function NewPostDialog({ isOpen, onSubmit, onClose }) {
    const [title, setTitle] = useState('');
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

    const validateInput = useCallback((newTitle) => newTitle !== '', []);
    
    function handleInputChange(e) {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSubmitBtnDisabled(!validateInput(newTitle));
    };

    function handleSubmit(e) {
        if (!validateInput()) return;
        e.preventDefault();
        setTitle('');
        onSubmit(title);
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
            isOpen={isOpen}
            title='Create New Post'
            confirmBtn='Add Post'
            confirmBtnDisabled={submitBtnDisabled}
            cancelBtn='Cancel'
            onConfirm={(e) => handleSubmit(e)}
            onClose={(e) => handleClose(e)}
        >
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
        </Dialog>
    );
};

export default NewPostDialog;