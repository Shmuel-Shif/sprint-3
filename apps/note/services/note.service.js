import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'notes'

export const noteService = {
    query,
    getById,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    getEmptyNote,
}

function query() {
    if (!localStorage.getItem(NOTE_KEY)) _createDemoNotes()
    return storageService.query(NOTE_KEY)
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function addNote(note) {
    if (!note.id) note.id = _makeId()
    note.createdAt = Date.now()
    return storageService.post(NOTE_KEY, note)
}

function updateNote(note) {
    return storageService.put(NOTE_KEY, note)
}

function deleteNote(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function togglePin(noteId) {
    return getById(noteId).then(note => {
        note.isPinned = !note.isPinned
        return updateNote(note)
    })
}

function getEmptyNote(type = 'NoteTxt') {
    return {
        id: '',
        createdAt: null,
        type,
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: type === 'NoteTxt'
            ? { txt: '' }
            : type === 'NoteImg'
                ? { url: '', title: '' }
                : { title: '', todos: [] }
    }
}

function _createDemoNotes() {
    const demoNotes = [
        {
            id: 'n101',
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'Fullstack Me Baby!' }
        },
        {
            id: 'n102',
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            style: { backgroundColor: '#00d' },
            info: { url: 'http://some-img/me', title: 'Bobi and Me' }
        },
        {
            id: 'n103',
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: '#ffffff' },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        }
    ]
    storageService.saveToStorage(NOTE_KEY, demoNotes)
}

function _makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
