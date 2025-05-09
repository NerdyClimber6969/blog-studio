import { useEditor, EditorContent } from '@tiptap/react';
import { useImperativeHandle } from 'react';
import MenuBar from './MenuBar/MenuBar.jsx';
import extensions from './extensions.jsx';
import './Editor.css'

function Editor({ content, ref }) {
    const editorInstance = useEditor({ 
        extensions: extensions, 
        content: content,
    });

    useImperativeHandle(ref, () => {
        return {
            getContent: () => editorInstance?.getHTML() || ''
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