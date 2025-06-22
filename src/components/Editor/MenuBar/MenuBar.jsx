import './MenuBar.css';

function MenuBar({ editor }) {  
    return editor && (
        <div className='menuBar'>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run() || !editor.isEditable}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run() || !editor.isEditable}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run() || !editor.isEditable}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                Strike
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run() || !editor.isEditable}
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                Code
            </button>
            <button 
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                disabled={!editor.isEditable}>
                Clear marks
            </button>
            <button 
                onClick={() => editor.chain().focus().clearNodes().run()}
                disabled={!editor.isEditable}
            >
                Clear nodes
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                disabled={!editor.isEditable}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                Paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                disabled={!editor.isEditable}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                disabled={!editor.isEditable}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                disabled={!editor.isEditable}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.isEditable}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                Bullet list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.isEditable}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                Ordered list
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                disabled={!editor.isEditable}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                Code block
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.isEditable}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                Blockquote
            </button>
            <button 
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                disabled={!editor.isEditable}
            >
                Horizontal rule
            </button>
            <button 
                onClick={() => editor.chain().focus().setHardBreak().run()}
                disabled={!editor.isEditable}
            >
                Hard break
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run() || !editor.isEditable}
            >
                Undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run() || !editor.isEditable}
            >
                Redo
            </button>
        </div>
    );
};

export default MenuBar;