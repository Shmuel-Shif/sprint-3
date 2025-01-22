const { useState } = React

export function NoteForm({ onAddNote }) {
    const [text, setText] = useState('')

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!text.trim()) return 
        onAddNote(text)
        setText('')
    }

    function autoResize(ev) {
        ev.target.style.height = 'auto' 
        ev.target.style.height = `${ev.target.scrollHeight}px` 
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <textarea
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
