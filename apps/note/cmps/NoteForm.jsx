const { useState, useRef } = React

export function NoteForm({ onAddNote }) {
    const [text, setText] = useState('')
    const textareaRef = useRef(null)

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!text.trim()) return
        onAddNote(text)
        setText('')
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
    }

    function autoResize(ev) {
        ev.target.style.height = 'auto'
        ev.target.style.height = `${ev.target.scrollHeight}px`
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <textarea
                ref={textareaRef}
                placeholder="Enter a note..."
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                onInput={autoResize}
                className="note-textarea"
            ></textarea>
            <button type="submit">Add</button>
        </form>
    )
}
