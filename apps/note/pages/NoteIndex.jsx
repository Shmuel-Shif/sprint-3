const { useState } = React

import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    function addNote(newNote) {
        if (!newNote.trim()) return
        setNotes([...notes, newNote])
    }

    function updateNote(idx, updatedText) {
        if (!updatedText.trim()) return
        const updatedNotes = [...notes]
        updatedNotes[idx] = updatedText
        setNotes(updatedNotes)
    }
    
    function deleteNote(idx) {
        const updatedNotes = notes.filter((_, i) => i !== idx)
        setNotes(updatedNotes)
    }    

    return (
        <section className="note-index">
            <h1>keep</h1>
            <NoteForm onAddNote={addNote} /> {}
            <NoteList 
                notes={notes} 
                onUpdateNote={updateNote} 
                onDeleteNote={deleteNote} 
            />
        </section>
    )
}

