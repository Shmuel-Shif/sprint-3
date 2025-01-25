import { NoteVideo } from '../cmps/NoteVideo.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'

export function NotePreview({ note, idx, onUpdateNote, onDeleteNote, onUpdateColor, onPinNote, onDuplicateNote }) {
    
    return (
        <div
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
                onBlur={(ev) => onUpdateNote(idx, ev.target.innerHTML)}
                style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    outline: 'none',
                }}
                >
                <div
                    dangerouslySetInnerHTML={{
                        __html: note.text
                        .replace(/(\r\n|\n|\r)/g, '<br />') 
                        .replace(/(^|\n)- (.*?)(?=\n|$)/g, '<ul><li>$2</li></ul>') 
                    }}
                    />
            </div>

            {note.imageUrl && <NoteImg url={note.imageUrl} />}
            {note.videoUrl && <NoteVideo url={note.videoUrl} />}

            <div className="note-button">
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
                <button onClick={() => onDuplicateNote(note)} className="duplicate-btn">
                    📑
                </button>
            </div>
        </div>
    )
}
