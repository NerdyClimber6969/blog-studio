import { useState } from 'react';

function useDialogManager(dialogs) {
    const [CurrentDialog, setCurrentDialog] = useState();

    function openDialog(dialogId, props = {}) {
        const SelectedDialog = dialogs[dialogId];
        return setCurrentDialog(() => () => (
            <SelectedDialog
                isOpen={true}
                onClose={() => closeDialog()}
                {...props}
            />
        ));
    };

    function closeDialog() {
        return setCurrentDialog(null);
    };

    return { CurrentDialog, openDialog, closeDialog };       
};

export default useDialogManager;