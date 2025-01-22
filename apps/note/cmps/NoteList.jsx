export function NoteList({ notes, onUpdateNote, onDeleteNote, onUpdateColor }) {
    return (
        <div className="note-list">
            {notes.length === 0 && <p>No notes yet...</p>}
            {notes.map((note, idx) => (
                <div 
                    key={idx} 
                    className="note" 
                    style={{ backgroundColor: note.backgroundColor }} 
                >
                    <input
                        type="text"
                        value={note.text}
                        onChange={(ev) => onUpdateNote(idx, ev.target.value)}
                        className="note-input"
                    />
                    <input
                        type="color"
                        value={note.backgroundColor}
                        onChange={(ev) => onUpdateColor(idx, ev.target.value)}
                        className="color-picker"
                    />
                    <button onClick={() => onDeleteNote(idx)} className="delete-btn">Delete</button>
                </div>
            ))}
        </div>
    )
}
