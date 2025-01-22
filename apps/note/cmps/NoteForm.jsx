const { useState } = React

export function NoteForm({ onAddNote }) {
    const [text, setText] = useState('')

    function handleSubmit(ev) {
        ev.preventDefault()
        onAddNote(text)
        setText('')
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Enter a note..."
            value={text}
            onChange={(ev) => setText(ev.target.value)}
        />
        <button type="submit">Add</button>
    </form>
)
}
