import { useState } from 'react';
import Input from '../Input/Input.jsx';
import Dialog from '../Dialog/Dialog.jsx';

function NewPostDialog({ isOpen, onSubmit, onClose }) {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});

    function validateInput() {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        };

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function handleSubmit(e) {
        if (!validateInput()) return;
        e.preventDefault();
        setTitle('');
        setErrors({});
        onSubmit(title);
        return;
    };

    function handleClose(e) {
        e.preventDefault();
        setTitle('');
        setErrors({});
        onClose();
        return;
    };

    return (
        <Dialog
            isOpen={isOpen}
            title='Create New Post'
            confirmBtn='Add Post'
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
                    error={errors.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
        </Dialog>
    );
};

export default NewPostDialog;