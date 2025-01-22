const { useState } = React

import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    function addNote(newNote) {
        if (!newNote.trim()) return
        setNotes([...notes, newNote])
    }

    return (
        <section className="note-index">
            <h1>keep</h1>
            <NoteForm onAddNote={addNote} /> {}
            <NoteList notes={notes} /> {}
        </section>
    )
}

