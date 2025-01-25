const { useState, useEffect  } = React

import { storageServiceUtils } from '../../../services/storage.service.js'
import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NotesMessage } from '../cmps/NotesMessage.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState([]) 
    const [searchTerm, setSearchTerm] = useState('')

    const { loadFromStorage, saveToStorage } = storageServiceUtils

    useEffect(() => {
        const savedNotes = loadFromStorage('notes') || []
        setNotes(savedNotes)
    }, [])

    useEffect(() => {
        if (notes.length > 0) {
            saveToStorage('notes', notes)
        }
    }, [notes])

    function addNote(newNote) {
        if (!newNote.text.trim() && !newNote.imageUrl && !newNote.videoUrl) return
        setNotes((prevNotes) => [
            ...prevNotes,
            { 
                id: Date.now(), 
                text: newNote.text, 
                backgroundColor: '#ffffff', 
                type: 'general', 
                isPinned: false,
                imageUrl: newNote.imageUrl,  
                videoUrl: newNote.videoUrl  
            }
        ])
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

    function onDuplicateNote(note) {
        const duplicatedNote = { ...note, id: Date.now() }
        setNotes((prevNotes) => [...prevNotes, duplicatedNote])
    }

    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const pinnedNotes = filteredNotes.filter(note => note.isPinned)
    const unpinnedNotes = filteredNotes.filter(note => !note.isPinned)

    return (
        <section className="note-index">
            <NoteHeader 
                searchTerm={searchTerm} 
                handleSearchChange={handleSearchChange} 
            />
            <NoteForm onAddNote={addNote} />

            {pinnedNotes.length > 0 && (
                <div>
                    <NoteList 
                        notes={pinnedNotes} 
                        onUpdateNote={updateNote} 
                        onDeleteNote={deleteNote} 
                        onUpdateColor={updateNoteColor}
                        onPinNote={onPinNote} 
                        onDuplicateNote={onDuplicateNote}
                    />
                    <h6 className="Job-title">Pinned Notes</h6>
                </div>
            )}

            {unpinnedNotes.length > 0 ? (
                <div>
                    <NoteList
                        notes={filteredNotes} 
                        onUpdateNote={updateNote} 
                        onDeleteNote={deleteNote} 
                        onUpdateColor={updateNoteColor}
                        onPinNote={onPinNote} 
                        onDuplicateNote={onDuplicateNote}
                    />
                    <h6 className="Job-title">Other Notes</h6>
                </div>
            ) : (
                <NotesMessage />
            )}
        </section>
    )
}
