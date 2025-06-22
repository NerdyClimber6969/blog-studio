import { useEditor, EditorContent } from '@tiptap/react';
import { useImperativeHandle } from 'react';
import MenuBar from './MenuBar/MenuBar.jsx';
import extensions from './extensions.jsx';
import './Editor.css'

function Editor({ content, ref }) {
    const editorInstance = useEditor({ 
        extensions: extensions, 
        content: content,
        editable: true,
    });

    useImperativeHandle(ref, () => {
        return {
            getContent: () => editorInstance?.getHTML() || '',
            setEditable: (state) => editorInstance?.setEditable(state)
        }
    });

    return (
        <div>
            <MenuBar editor={editorInstance}/>
            <EditorContent editor={editorInstance}/>
        </div>
    );
};

export default Editor;