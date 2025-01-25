
const initialNotes = [
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

export const noteService = {
    query,
    get,
    post,
    put,
    remove,
    pinNote,
}

async function query() {
    let notes = await storageService.query('notes')
    if (!notes || notes.length === 0) {
        notes = initialNotes
        await storageService.saveToStorage('notes', notes)
    }
    return notes
}

async function get(noteId) {
    try {
        return await storageService.get('notes', noteId)
    } catch (err) {
        console.error('Error getting note', err)
    }
}

async function post(newNote) {
    try {
        return await storageService.post('notes', newNote)
    } catch (err) {
        console.error('Error adding note', err)
    }
}

async function put(updatedNote) {
    try {
        return await storageService.put('notes', updatedNote)
    } catch (err) {
        console.error('Error updating note', err)
    }
}

async function remove(noteId) {
    try {
        await storageService.remove('notes', noteId)
    } catch (err) {
        console.error('Error removing note', err)
    }
}

async function pinNote(noteId) {
    try {
        const note = await get(noteId)
        note.isPinned = !note.isPinned
        return await put(note)
    } catch (err) {
        console.error('Error pinning note', err)
    }
}
