
import { storageService } from '../../../services/async-storage.service.js'
import { storageServiceUtils } from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

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
        await storageServiceUtils.saveToStorage('notes', notes)
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

function _createNotes() {
    let notes = storageServiceUtils.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        
        let notes = [
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
                        },
                        {
                            id: 'n104',
                            createdAt: 1112225,
                            type: 'NoteTxt',
                            isPinned: true,
                            style: {
                                backgroundColor: '#f00'
                            },
                            info: {
                                txt: 'Learn React Hooks!'
                            }
                        },
                        {
                            id: 'n105',
                            createdAt: 1112226,
                            type: 'NoteImg',
                            isPinned: false,
                            info: {
                                url: 'http://image.com/awesome',
                                title: 'Summer Vibes'
                            },
                            style: {
                                backgroundColor: '#0d0'
                            }
                        },
                        {
                            id: 'n106',
                            createdAt: 1112227,
                            type: 'NoteTodos',
                            isPinned: true,
                            info: {
                                title: 'Weekend Plans',
                                todos: [
                                    { txt: 'Go for a hike', doneAt: null },
                                    { txt: 'Cook a nice dinner', doneAt: 187111121 }
                                ]
                            }
                        },
                        {
                            id: 'n107',
                            createdAt: 1112228,
                            type: 'NoteTxt',
                            isPinned: false,
                            style: {
                                backgroundColor: '#0f0'
                            },
                            info: {
                                txt: 'Time to relax!'
                            }
                        },
                        {
                            id: 'n108',
                            createdAt: 1112229,
                            type: 'NoteImg',
                            isPinned: false,
                            info: {
                                url: 'http://image.com/party',
                                title: 'Birthday Party'
                            },
                            style: {
                                backgroundColor: '#ff0'
                            }
                        },
                        {
                            id: 'n109',
                            createdAt: 1112230,
                            type: 'NoteTodos',
                            isPinned: true,
                            info: {
                                title: 'Work Tasks',
                                todos: [
                                    { txt: 'Finish project', doneAt: null },
                                    { txt: 'Send emails', doneAt: null }
                                ]
                            }
                        },
                        {
                            id: 'n110',
                            createdAt: 1112231,
                            type: 'NoteTxt',
                            isPinned: false,
                            style: {
                                backgroundColor: '#0d0'
                            },
                            info: {
                                txt: 'Learning CSS Grid'
                            }
                        },
                        {
                            id: 'n111',
                            createdAt: 1112232,
                            type: 'NoteImg',
                            isPinned: false,
                            info: {
                                url: 'http://image.com/coding',
                                title: 'Coding Time'
                            },
                            style: {
                                backgroundColor: '#800080'
                            }
                        },
                        {
                            id: 'n112',
                            createdAt: 1112233,
                            type: 'NoteTodos',
                            isPinned: false,
                            info: {
                                title: 'Morning Routine',
                                todos: [
                                    { txt: 'Drink water', doneAt: null },
                                    { txt: 'Stretch', doneAt: null }
                                ]
                            }
                        },
                        {
                            id: 'n113',
                            createdAt: 1112234,
                            type: 'NoteTxt',
                            isPinned: true,
                            style: {
                                backgroundColor: '#8a2be2'
                            },
                            info: {
                                txt: 'Always be learning!'
                            }
                        },
                        {
                            id: 'n114',
                            createdAt: 1112235,
                            type: 'NoteImg',
                            isPinned: false,
                            info: {
                                url: 'http://image.com/nature',
                                title: 'Nature Walk'
                            },
                            style: {
                                backgroundColor: '#a52a2a'
                            }
                        },
                        {
                            id: 'n115',
                            createdAt: 1112236,
                            type: 'NoteTodos',
                            isPinned: false,
                            info: {
                                title: 'Shopping List',
                                todos: [
                                    { txt: 'Buy milk', doneAt: null },
                                    { txt: 'Get bread', doneAt: null }
                                ]
                            }
                        },
                        {
                            id: 'n116',
                            createdAt: 1112237,
                            type: 'NoteTxt',
                            isPinned: true,
                            style: {
                                backgroundColor: '#000080'
                            },
                            info: {
                                txt: 'Stay motivated!'
                            }
                        },
                        {
                            id: 'n117',
                            createdAt: 1112238,
                            type: 'NoteImg',
                            isPinned: false,
                            info: {
                                url: 'http://image.com/travel',
                                title: 'Travel Bucket List'
                            },
                            style: {
                                backgroundColor: '#808080'
                            }
                        },
                        {
                            id: 'n118',
                            createdAt: 1112239,
                            type: 'NoteTodos',
                            isPinned: true,
                            info: {
                                title: 'Fitness Goals',
                                todos: [
                                    { txt: 'Run 5k', doneAt: null },
                                    { txt: 'Yoga', doneAt: 187111122 }
                                ]
                            }
                        },
                        {
                            id: 'n119',
                            createdAt: 1112240,
                            type: 'NoteTxt',
                            isPinned: false,
                            style: {
                                backgroundColor: '#ff6347'
                            },
                            info: {
                                txt: 'Code, Eat, Sleep, Repeat'
                            }
                        }
                    ] 
                    
                    storageServiceUtils.saveToStorage(NOTE_KEY, notes)
                }
}