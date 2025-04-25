import { useEditor, EditorContent } from '@tiptap/react';
import { useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import MenuBar from './MenuBar.jsx';
import './MenuBar.css';
import './Editor.css'

// define your extension array
const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
];


function Editor({ title, content, onSave }) {
    const [postTitle, setPostTitle] = useState(title);
    const editor = useEditor({ 
        extensions: extensions, 
        content: content
    });


    return (
        <div>
            <div className='mb6'>
                <h3 className='font-sm bold mb2'>Title</h3>
                <input
                    className='font-sm' 
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
            </div>

            <div>
                <h3 className='font-sm bold mb2'>Content</h3>
                <MenuBar editor={editor}/>
                <EditorContent 
                    editor={editor} 
                />
            </div>

            <button onClick={() => onSave(postTitle, editor.getHTML())}>Save</button>
        </div>
    );
};

export default Editor;