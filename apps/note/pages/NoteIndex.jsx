const { useState } = React

import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NotesMessage } from '../cmps/NotesMessage.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    function addNote(newNote) {
        setNotes([...notes, { text: newNote, backgroundColor: '#ffffff', type: 'general', isPinned: false }])
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

    function onPinNote(idx) {
        const updatedNotes = [...notes]
        updatedNotes[idx].isPinned = !updatedNotes[idx].isPinned
        setNotes(updatedNotes)
    }

    function handleSearchChange(ev) {
        setSearchTerm(ev.target.value)
    }

    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm.toLowerCase()))
    const pinnedNotes = filteredNotes.filter(note => note.isPinned)
    const unpinnedNotes = filteredNotes.filter(note => !note.isPinned)

    return (
        <section className="note-index">
            <NoteHeader searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <NoteForm onAddNote={addNote} />
            {pinnedNotes.length > 0 && (
                <div>
                    <NoteList
                        notes={pinnedNotes}
                        onUpdateNote={updateNote}
                        onDeleteNote={deleteNote}
                        onUpdateColor={updateNoteColor}
                        onPinNote={onPinNote}
                    />
                    <h6 className="job-title">Pinned Notes</h6>
                </div>
            )}
            {unpinnedNotes.length > 0 ? (
                <div>
                    <NoteList
                        notes={unpinnedNotes}
                        onUpdateNote={updateNote}
                        onDeleteNote={deleteNote}
                        onUpdateColor={updateNoteColor}
                        onPinNote={onPinNote}
                    />
                    <h6 className="job-title">Other Notes</h6>
                </div>
            ) : (
                <NotesMessage />
            )}
        </section>
    )
}
