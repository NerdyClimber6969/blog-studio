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
            <div className='font-sm' style={{margin: 'var(--spacing5) 0'}}>
                <p>Are you sure you want to delete?</p>
            </div>
        </Dialog>
    );
};

export default DeleteDialog;