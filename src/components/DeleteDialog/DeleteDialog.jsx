import Dialog from '../Dialog/Dialog.jsx';

function DeleteDialog({isOpen, onConfirm, onClose}) {
    function handleConfirm(e) {
        e.preventDefault();
        onConfirm();
        return;
    }
 
    function handleClose(e) {
        e.preventDefault();
        onClose();
        return;
    };

    return isOpen && (
        <Dialog
            isOpen={isOpen}
            title='Confirm Delete'
            confirmBtn='Yes'
            cancelBtn='No'
            onConfirm={(e) => handleConfirm(e)}
            onClose={(e) => handleClose(e)}
            showCloseButton={false}
        >
            <div style={{marginBottom: 'var(--spacing3)'}}>
                <p>Are you sure you want to delete?</p>
            </div>
        </Dialog>
    );
};

export default DeleteDialog;