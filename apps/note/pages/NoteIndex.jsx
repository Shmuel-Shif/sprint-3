const { useState } = React

import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    function addNote(newNote) {
        if (!newNote.trim()) return
        setNotes([...notes, { text: newNote, backgroundColor: '#ffffff', type: 'general' }])
    }

    function updateNote(idx, updatedText) {
        if (!updatedText.trim()) return
        const updatedNotes = [...notes]
        updatedNotes[idx].text = updatedText
        setNotes(updatedNotes)
    }

    function deleteNote(idx) {
        const updatedNotes = notes.filter((_, i) => i !== idx)
        setNotes(updatedNotes)
    }

    function updateNoteColor(idx, color) {
        const updatedNotes = [...notes]
        updatedNotes[idx].backgroundColor = color
        setNotes(updatedNotes)
    }

    function handleSearchChange(ev) {
        setSearchTerm(ev.target.value)
    }

    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <section className="note-index">
            {/* <h1>Keep</h1> */}
            
            <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <NoteForm onAddNote={addNote} />
            <NoteList 
                notes={filteredNotes} 
                onUpdateNote={updateNote} 
                onDeleteNote={deleteNote} 
                onUpdateColor={updateNoteColor} 
            />
        </section>
    )
}
