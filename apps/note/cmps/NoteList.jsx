export function NoteList({ notes, onUpdateNote, onDeleteNote, onUpdateColor, onPinNote }) {
    return (
        <div className="note-list">
            {notes.length === 0 && <p>No notes yet...</p>}
            {notes.map((note, idx) => (
                <div
                    key={idx}
                    className="note"
                    style={{
                        backgroundColor: note.backgroundColor,
                        position: 'relative',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(ev) => onUpdateNote(idx, ev.target.textContent)}
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            outline: 'none',
                        }}
                    >
                        {note.text}
                    </div>
                    <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '5px' }}>
                        <button
                            className="color-picker-btn"
                            onClick={() => document.getElementById(`color-picker-${idx}`).click()}
                        >
                            &#9998;
                        </button>
                        <input
                            id={`color-picker-${idx}`}
                            type="color"
                            style={{ display: 'none' }}
                            onChange={(ev) => onUpdateColor(idx, ev.target.value)}
                        />
                        <button onClick={() => onDeleteNote(idx)} className="delete-btn">
                            🗑️
                        </button>
                        <button onClick={() => onPinNote(idx)} className="pin-btn">
                            {note.isPinned ? '📌' : '📍'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
