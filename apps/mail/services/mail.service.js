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
    getEmptyMail,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead) 
            } else if (filterBy.isRead === false) {
                mails = mails.filter(mail => mail.isRead === false) 
            }
            if (filterBy.isStarred) {
                mails = mails.filter(mail => mail.isStarred)
            } else if (filterBy.isStarred === false) {
                mails = mails.filter(mail => mail.isStarred === false)
            }
            switch (filterBy.status) {
                case 'inbox':
                    mails = mails.filter(mail => mail.sentAt && !mail.isTrash)
                    break
                case 'starred':
                    mails = mails.filter(mail => mail.isStarred)
                    break
                case 'sent':
                    mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt && !mail.isTrash )
                    break
                case 'trash':
                    mails = mails.filter(mail => mail.isTrash)
                    break
                case 'draft':
                    mails = mails.filter(mail =>mail.from === loggedinUser.email && mail.sentAt === null)
                    break
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
        mail.sentAt = Date.now()
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        isRead: null,
        isStarred: null,
        status: 'inbox',
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
            const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
            const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.lenght - 1]
            mail.nextMailId = nextMail.id
            mail.prevMailId = prevMail.id
            return mail
        })
}

function getEmptyMail(createdAt = Date.now(), subject = '', body = '', isRead = false, to = '') {
    return {
        // id: utilService.makeId(),
        createdAt,
        subject,
        body,
        isRead,
        // sentAt,
        removedAt: null,
        from: loggedinUser.email,
        to,
    }
}

// function getFilterFromSearchParams(searchParams) {
//     const txt = searchParams.get('txt') || ''
//     const minSpeed = searchParams.get('minSpeed') || ''
//     return {
//         txt,
//         minSpeed
//     }
// }

function _createMails() {
    let mails = storageServiceUtils.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        let mails = [
            {
                "id": "e101",
                "createdAt": 139539577256 + 1551133930500,
                "subject": "Miss you!",
                "body": "Would love to catch up sometimes",
                "isRead": false,
                "sentAt": 139539577256 + 1551133930594,
                "removedAt": null,
                "from": "momo@momo.com",
                "to": "user@appsus.com",
                "isStarred": true,
                "isTrash": false
            },
            {
                "id": "e102",
                "createdAt": 139539577256 + 1552156870540,
                "subject": "Lunch plans",
                "body": "How about we go for lunch this weekend?",
                "isRead": false,
                "sentAt": 139539577256 + 1552156871000,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "john@example.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e103",
                "createdAt": 139539577256 + 1553008924320,
                "subject": "Team meeting reminder",
                "body": "Don’t forget the team meeting tomorrow at 10 AM.",
                "isRead": true,
                "sentAt": 139539577256 + 1553008924450,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "team@workplace.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e104",
                "createdAt": 139539577256 + 1554009025425,
                "subject": "Re: Vacation plans",
                "body": "I’ve booked the tickets for next week. Excited!",
                "isRead": false,
                "sentAt": 139539577256 + 1554009025540,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "lisa@holiday.com",
                "isStarred": true,
                "isTrash": false
            },
            {
                "id": "e105",
                "createdAt": 139539577256 + 1555000000000,
                "subject": "Work deadlines",
                "body": "I need the project updates by tomorrow afternoon.",
                "isRead": true,
                "sentAt": 139539577256 + 1555000000120,
                "removedAt": null,
                "from": "manager@company.com",
                "to": "user@appsus.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e106",
                "createdAt": 139539577256 + 1555557380490,
                "subject": "Dinner next Friday?",
                "body": "What time are we meeting for dinner on Friday?",
                "isRead": false,
                "sentAt": 139539577256 + 1555557380585,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "emily@friends.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e107",
                "createdAt": 139539577256 + 1556001234560,
                "subject": "Project meeting notes",
                "body": "Here are the notes from our project meeting.",
                "isRead": true,
                "sentAt": 139539577256 + 1556001234670,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "alex@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e108",
                "createdAt": 139539577256 + 1557108882935,
                "subject": "Job opportunity",
                "body": "There’s a new job opening at our company.",
                "isRead": false,
                "sentAt": 139539577256 + 1557108883020,
                "removedAt": null,
                "from": "hr@company.com",
                "to": "user@appsus.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e109",
                "createdAt": 139539577256 + 1558000000000,
                "subject": "Birthday invitation",
                "body": "Join me for my birthday party next week!",
                "isRead": true,
                "sentAt": 139539577256 + 1558000000100,
                "removedAt": null,
                "from": "susan@party.com",
                "to": "user@appsus.com",
                "isStarred": false,
                "isTrash": true
            },
            {
                "id": "e110",
                "createdAt": 139539577256 + 1559220221985,
                "subject": "Meeting tomorrow",
                "body": "Reminder: We have a meeting tomorrow at 9 AM.",
                "isRead": false,
                "sentAt": 139539577256 + 1559220222050,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "manager@business.com",
                "isStarred": true,
                "isTrash": false
            },
            {
                "id": "e111",
                "createdAt": 139539577256 + 1559765321000,
                "subject": "Re: Document submission",
                "body": "I’ve uploaded the final version of the document.",
                "isRead": true,
                "sentAt": 139539577256 + 1559765321100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "admin@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e112",
                "createdAt": 139539577256 + 1560801223000,
                "subject": "Job application",
                "body": "I’ve submitted my job application for the new role.",
                "isRead": false,
                "sentAt": 139539577256 + 1560801223120,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "hr@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e113",
                "createdAt": 139539577256 + 1561224567889,
                "subject": "Catch up soon?",
                "body": "Let’s catch up over the weekend!",
                "isRead": false,
                "sentAt": 139539577256 + 1561224567990,
                "removedAt": null,
                "from": "jane@friends.com",
                "to": "user@appsus.com",
                "isStarred": true,
                "isTrash": false
            },
            {
                "id": "e114",
                "createdAt": 139539577256 + 1561900091111,
                "subject": "Proposal feedback",
                "body": "Please provide feedback on the proposal document.",
                "isRead": true,
                "sentAt": 139539577256 + 1561900091210,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "client@business.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e115",
                "createdAt": 139539577256 + 1562300456000,
                "subject": "Reminder: Code review tomorrow",
                "body": "Reminder: The code review session is tomorrow at 2 PM.",
                "isRead": false,
                "sentAt": 139539577256 + 1562300456100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "devteam@workplace.com",
                "isStarred": false,
                "isTrash": true
            },
            {
                "id": "e116",
                "createdAt": 139539577256 + 1563300764000,
                "subject": "Sales targets update",
                "body": "Here is the updated sales target for the quarter.",
                "isRead": true,
                "sentAt": 139539577256 + 1563300764110,
                "removedAt": null,
                "from": "sales@company.com",
                "to": "user@appsus.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e117",
                "createdAt": 139539577256 + 1564556677890,
                "subject": "End of the month review",
                "body": "Let's do a quick review of this month’s performance.",
                "isRead": true,
                "sentAt": 139539577256 + 1564556677990,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "manager@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e118",
                "createdAt": 139539577256 + 1565100000000,
                "subject": "New project assignment",
                "body": "I’ve assigned you to the new project team.",
                "isRead": false,
                "sentAt": 139539577256 + 1565100000100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "employee@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e119",
                "createdAt": 139539577256 + 1565501000100,
                "subject": "Re: Meeting this week",
                "body": "Can we reschedule the meeting for Thursday?",
                "isRead": true,
                "sentAt": 139539577256 + 1565501000210,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "client@business.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e120",
                "createdAt": 139539577256 + 1565902000234,
                "subject": "Lunch next week?",
                "body": "Let’s have lunch next week. I’ll be free on Tuesday.",
                "isRead": false,
                "sentAt": null,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "michael@friends.com",
                "isStarred": true,
                "isTrash": false
            },
            {
                "id": "e121",
                "createdAt": 139539577256 + 1567501234000,
                "subject": "Client feedback",
                "body": "We received some valuable feedback from the client regarding the latest proposal. I'll need your thoughts before we finalize it.",
                "isRead": false,
                "sentAt": 139539577256 + 1567501234120,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "designer@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e122",
                "createdAt": 139539577256 + 1568003001000,
                "subject": "Meeting notes",
                "body": "I’ve attached the notes from our meeting. Please review and let me know if anything is missing or needs adjustment.",
                "isRead": true,
                "sentAt": 139539577256 + 1568003001120,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "team@workplace.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e123",
                "createdAt": 139539577256 + 1568605002000,
                "subject": "Report submission",
                "body": "I just submitted the quarterly report. Please check it and confirm if everything looks good for the meeting tomorrow morning.",
                "isRead": true,
                "sentAt": 139539577256 + 1568605002100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "manager@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e124",
                "createdAt": 139539577256 + 1569206789000,
                "subject": "Dinner plans",
                "body": "How does Friday sound for dinner? I’m thinking of trying that new restaurant that just opened in town. Let me know!",
                "isRead": false,
                "sentAt": 139539577256 + 1569206789100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "karen@friends.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e125",
                "createdAt": 139539577256 + 1569909875000,
                "subject": "New task assigned",
                "body": "I’ve assigned you a new task. The details are in the task tracker. Please complete it by the end of this week.",
                "isRead": false,
                "sentAt": 139539577256 + 1569909875100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "developer@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e126",
                "createdAt": 139539577256 + 1570502001000,
                "subject": "Quick check-in",
                "body": "I wanted to check in with you regarding the progress of the new project. Let me know if you need any support or resources.",
                "isRead": false,
                "sentAt": 139539577256 + 1570502001100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "projectmanager@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e127",
                "createdAt": 139539577256 + 1571103005000,
                "subject": "Follow-up on request",
                "body": "Just following up on the request I made last week regarding the software update. Any updates on the timeline?",
                "isRead": false,
                "sentAt": 139539577256 + 1571103005200,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "support@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e128",
                "createdAt": 139539577256 + 1571501200000,
                "subject": "Important reminder",
                "body": "This is a reminder about the project deadline next week. Please ensure all deliverables are completed by the end of the week.",
                "isRead": true,
                "sentAt": 139539577256 + 1571501200100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "team@workplace.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e129",
                "createdAt": 139539577256 + 1572002430000,
                "subject": "Travel arrangements",
                "body": "I’ve booked your flights for next week’s conference. All details are in the email. Let me know if anything needs adjusting.",
                "isRead": true,
                "sentAt": null,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "colleague@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e130",
                "createdAt": 139539577256 + 1572603200000,
                "subject": "End of year review",
                "body": "Let’s schedule a quick end-of-year review to go over accomplishments and set goals for next year. Are you free on Thursday?",
                "isRead": false,
                "sentAt": 139539577256 + 1572603200100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "employee@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e131",
                "createdAt": 139539577256 + 1573204568000,
                "subject": "Weekend trip",
                "body": "I’m planning a weekend trip to the mountains. Would you be interested in joining? Let me know by tomorrow if you're free.",
                "isRead": false,
                "sentAt": 139539577256 + 1573204568100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "sarah@friends.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e132",
                "createdAt": 139539577256 + 1573805983000,
                "subject": "Code review",
                "body": "Please review the latest code changes and provide your feedback. We need to finalize everything before the end of the week.",
                "isRead": true,
                "sentAt": 139539577256 + 1573805983100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "devteam@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e133",
                "createdAt": 139539577256 + 1574407450000,
                "subject": "Re: Project timeline",
                "body": "Thanks for the update on the project timeline. Can you please send over the final details so I can schedule the next meeting?",
                "isRead": true,
                "sentAt": 139539577256 + 1574407450100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "client@business.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e134",
                "createdAt": 139539577256 + 1575008452000,
                "subject": "Lunch today?",
                "body": "Are you free for lunch today? I’m planning to try that new cafe nearby. Let me know if you’re interested.",
                "isRead": true,
                "sentAt": 139539577256 + 1575008452100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "alice@friends.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e135",
                "createdAt": 139539577256 + 1575609301000,
                "subject": "Conference registration",
                "body": "I’ve completed the registration for next month’s conference. Please check the attached details and confirm your attendance.",
                "isRead": true,
                "sentAt": 139539577256 + 1575609301100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "conference@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e136",
                "createdAt": 139539577256 + 1576200800000,
                "subject": "Meeting agenda",
                "body": "Here’s the agenda for tomorrow’s meeting. Please review it and let me know if you want to add anything before we start.",
                "isRead": false,
                "sentAt": 139539577256 + 1576200800100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "team@workplace.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e137",
                "createdAt": 139539577256 + 1576802105000,
                "subject": "Job interview",
                "body": "I’ve scheduled an interview for you with the hiring manager. The details are in the email. Let me know if you have any questions.",
                "isRead": false,
                "sentAt": 139539577256 + 1576802105100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "candidate@company.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e138",
                "createdAt": 139539577256 + 1577403601000,
                "subject": "Team feedback",
                "body": "I need your feedback on the new team structure. Please send me your thoughts by the end of the week so we can finalize everything.",
                "isRead": true,
                "sentAt": 139539577256 + 1577403601100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "team@workplace.com",
                "isStarred": false,
                "isTrash": false
            },
            {
                "id": "e139",
                "createdAt": 139539577256 + 1578004995000,
                "subject": "Final review",
                "body": "Please review the final draft of the report. I need to submit it by tomorrow, so any last-minute suggestions are welcome.",
                "isRead": false,
                "sentAt": 139539577256 + 1578004995100,
                "removedAt": null,
                "from": "user@appsus.com",
                "to": "editor@company.com",
                "isStarred": false,
                "isTrash": false
            }
        ]

        // for (let i = 0; i < 100; i++) {
        //     const mail = {
        //         id: utilService.makeId(),
        //         createdAt: u139539577256+tilService.getRandomIntInclusive(1551133930594, 1737544572356), ///
        //         subject: utilService.makeLorem(2),
        //         body: utilService.makeLorem(8),
        //         isRead: Math.random() > 0.7,
        //         sentAt: u139539577256+tilService.getRandomIntInclusive(1551133930594, 1737544572356),////
        //         removedAt: null,
        //         from: 'momo@momo.com',
        //         to: 'user@appsus.com',
        //         isStarred: Math.random() > 0.7
        //     }

        //     mails.push(mail)

        // }
        console.log(mails)
        storageServiceUtils.saveToStorage(MAIL_KEY, mails)
    }
}