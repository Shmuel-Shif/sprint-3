export function NoteList({ notes }) {
    return (
        <div className="note-list">
            {notes.length === 0 && <p>No notes yet...</p>}
            {notes.map((note, idx) => (
                <div key={idx} className="note">
                    {note}
                </div>
            ))}
        </div>
    )
}
