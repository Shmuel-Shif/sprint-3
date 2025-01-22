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
        <div className='mails-container grid'>
            <button className="btn-toggle-menu" >☰</button> 
            {/* onClick={toggleMenu()} */}
            <img src="../assets/img/Gmail_icon_(2020).svg.webp" className="logo" />
            <FilterMails />
            <MailList mails={mails} onRemove={removeMail} />
            <div className='mail-folder-list'>
                <button>📧Compose</button>
                <MailFolderList />
                {/* <MailCompose /> */}
            </div>
            {/* <MailDetails /> */}
        </div>
    )
}

