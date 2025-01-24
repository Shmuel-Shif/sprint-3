
import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes, onUpdateNote, onDeleteNote, onUpdateColor, onPinNote }) {
    return (
        <div className="note-list">
            {notes.map((note, idx) => (
                <NotePreview
                    key={idx}
                    note={note}
                    idx={idx}
                    onUpdateNote={onUpdateNote}
                    onDeleteNote={onDeleteNote}
                    onUpdateColor={onUpdateColor}
                    onPinNote={onPinNote}
                />
            ))}
        </div>
    )
}
