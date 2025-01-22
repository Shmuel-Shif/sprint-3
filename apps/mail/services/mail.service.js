import { storageService } from '../../../services/async-storage.service.js'
import { storageServiceUtils } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead) /// === true
            } else if (filterBy.isRead === false) {
                mails = mails.filter(mail => mail.isRead === false) /// === true
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        isRead: null,
    }
}
// const filterBy = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
//    }

function _createMails() {
    let mails = storageServiceUtils.loadFromStorage(MAIL_KEY)
    console.log(mails);
    if (!mails || !mails.length) {
        let mails = []
        for (let i = 0; i < 5; i++) {
            const mail = {
                id: utilService.makeId(),
                createdAt:utilService.getRandomIntInclusive(1551133930594, 1737544572356), ///
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(8),
                isRead: Math.random() > 0.7,
                sentAt:  utilService.getRandomIntInclusive(1551133930594, 1737544572356),////
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            }

            mails.push(mail)

        }
        console.log(mails)
        storageServiceUtils.saveToStorage(MAIL_KEY, mails)
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
            const nextMail = mails[mailIdx + 1] ? [mailIdx + 1] : mails[0]
            const prevMail = mails[mailIdx - 1] ? [mailIdx - 1] : mails[mails.lenght - 1]
            mail.nextMailId = nextMail.id
            mail.prevMailId = prevMail.id
            return book
        })
}

// function getFilterFromSearchParams(searchParams) {
//     const txt = searchParams.get('txt') || ''
//     const minSpeed = searchParams.get('minSpeed') || ''
//     return {
//         txt,
//         minSpeed
//     }
// }