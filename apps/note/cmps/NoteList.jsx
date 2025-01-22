
export function NoteList({ notes, onUpdateNote, onDeleteNote }) {
    return (
        <div className="note-list">
            {notes.length === 0 && <p>No notes yet...</p>}
            {notes.map((note, idx) => (
                <div key={idx} className="note">
                    <input
                        type="text"
                        value={note}
                        onChange={(ev) => onUpdateNote(idx, ev.target.value)}
                        className="note-input"
                    />
                <button onClick={() => onDeleteNote(idx)} className="delete-btn">Delete</button>
             </div>
            ))}
        </div>
    )
}
