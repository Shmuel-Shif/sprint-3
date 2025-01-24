const { useState, useRef } = React

export function NoteForm({ onAddNote }) {
    const [text, setText] = useState('')
    const [url, setUrl] = useState('')
    const [noteType, setNoteType] = useState('text')
    const textareaRef = useRef(null)

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!text.trim() && !url.trim()) return
        let newNote = { text, type: noteType }
        if (noteType === 'image') {
            newNote.imageUrl = url
        } else if (noteType === 'video') {
            newNote.videoUrl = url
        }
        onAddNote(newNote)
        setText('')
        setUrl('')
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
    }
    

    function autoResize(ev) {
        ev.target.style.height = 'auto'
        ev.target.style.height = `${ev.target.scrollHeight}px`
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <div className="note-type-buttons">
                <button 
                    type="button" 
                    onClick={() => setNoteType('text')} 
                    className={noteType === 'text' ? 'active' : ''}
                >
                    📝
                </button>
                <button 
                    type="button" 
                    onClick={() => setNoteType('image')} 
                    className={noteType === 'image' ? 'active' : ''}
                >
                    🖼️
                </button>
                <button 
                    type="button" 
                    onClick={() => setNoteType('video')} 
                    className={noteType === 'video' ? 'active' : ''}
                >
                    🎥
                </button>
                <button 
                    type="button" 
                    onClick={() => setNoteType('todos')} 
                    className={noteType === 'todos' ? 'active' : ''}
                >
                    ✅
                </button>
            </div>

            {noteType === 'text' && (
                <textarea
                    ref={textareaRef}
                    placeholder="Enter a note..."
                    value={text}
                    onChange={(ev) => setText(ev.target.value)}
                    onInput={autoResize}
                    className="note-textarea"
                ></textarea>
            )}

            {(noteType === 'image' || noteType === 'video') && (
                <textarea
                    type="url"
                    placeholder={`Enter ${noteType} URL`}
                    value={url}
                    onChange={(ev) => setUrl(ev.target.value)}
                ></textarea>
            )}
            
            {noteType === 'todos' && (
                <textarea
                    ref={textareaRef}
                    placeholder="Enter your tasks..."
                    value={text}
                    onChange={(ev) => setText(ev.target.value)}
                    onInput={autoResize}
                    className="note-textarea"
                ></textarea>
            )}

            <button type="submit">Add</button>
        </form>
    )
}