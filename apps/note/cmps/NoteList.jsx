export function NoteList({ notes, onUpdateNote, onDeleteNote, onUpdateColor }) {
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
                            outline: 'none'
                        }}
                    >
                        {note.text}
                    </div>
                    <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '5px' }}>
                        <button
                            className="color-picker-btn"
                            onClick={() => {
                                const colorInput = document.createElement('input')
                                colorInput.type = 'color'
                                colorInput.style.display = 'none'
                                document.body.appendChild(colorInput)
                                colorInput.click()
                                colorInput.oninput = (ev) => {
                                    onUpdateColor(idx, ev.target.value)
                                    document.body.removeChild(colorInput)
                                }
                            }}
                        >
                            &#9998;
                        </button>
                        <button onClick={() => onDeleteNote(idx)} className="delete-btn">
                            🗑️
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
