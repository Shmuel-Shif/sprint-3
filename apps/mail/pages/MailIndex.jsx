import { mailService } from '../services/mail.service.js'
import { FilterMails } from '../cmps/FilterMails.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
                console.log(mails)
            })
    }, [filterBy])

    function removeMail() {
        console.log('removed!!!')
    }

    if (!mails) return <h2>Loading</h2>
    return (
        <div className='mails-container'>
            <h1>Jmail</h1>
            <button>📧Compose</button>
            <FilterMails />
            <MailList mails={mails} onRemove={removeMail} />
            <MailFolderList />
            <MailCompose/>
            <MailDetails/>
        </div>
    )
}

