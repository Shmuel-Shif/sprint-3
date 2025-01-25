import { storageService } from '../../../services/async-storage.service.js'
import { storageServiceUtils } from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'

// מוודא ש-Notes ייווצרו ברגע שהקובץ נטען
_createNotes().then(() => {
    console.log('Notes from localStorage after creation:', notes)
})

export const noteService = {
    query,
    get,
    post,
    put,
    remove,
    pinNote,
}

async function query() {
    console.log('Attempting to load notes...')
    let notes = await storageService.query('notes')
    console.log('Loaded notes:', notes)
    if (!notes || notes.length === 0) {
        console.log('No notes found, creating initial notes...')
        notes = initialNotes
        await storageServiceUtils.saveToStorage('notes', notes)
        console.log('Saved initial notes:', notes)
    }
    return notes
}

async function get(noteId) {
    try {
        console.log(`Getting note with ID: ${noteId}`)
        return await storageService.get('notes', noteId)
    } catch (err) {
        console.error('Error getting note', err)
    }
}

async function post(newNote) {
    try {
        console.log('Adding new note:', newNote)
        return await storageService.post('notes', newNote)
    } catch (err) {
        console.error('Error adding note', err)
    }
}

async function put(updatedNote) {
    try {
        console.log('Updating note:', updatedNote)
        return await storageService.put('notes', updatedNote)
    } catch (err) {
        console.error('Error updating note', err)
    }
}

async function remove(noteId) {
    try {
        console.log(`Removing note with ID: ${noteId}`)
        await storageService.remove('notes', noteId)
    } catch (err) {
        console.error('Error removing note', err)
    }
}

async function pinNote(noteId) {
    try {
        console.log(`Pinning note with ID: ${noteId}`)
        const note = await get(noteId)
        note.isPinned = !note.isPinned
        console.log('Updated note after pin toggle:', note)
        return await put(note)
    } catch (err) {
        console.error('Error pinning note', err)
    }
}

async function _createNotes() {
    console.log('Creating notes if none exist...')
    let notes = await storageServiceUtils.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        console.log('No notes in storage, creating new ones...')
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
        await storageServiceUtils.saveToStorage(NOTE_KEY, notes)
        console.log('Created notes:', notes)
    } else {
        console.log('Notes already exist in storage:', notes)
    }
}
