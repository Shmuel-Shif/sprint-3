import { mailService } from '../services/mail.service.js'
import { FilterMails } from '../cmps/FilterMails.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailDetails } from '../cmps/MailDetails.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [selectedMailId, setSelectedMailId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        mailService.query(filterBy)
            .then(setMails)
    }, [filterBy])

    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                // showSuccessMsg(`mail removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                // showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }

    function onSelectedMailId(mail) {
        onReadMail(mail)
        // setSelectedMailId(mailId)
        navigate(`/mail/${mail.id}`)

    }

    function onReadMail(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
    }

    function onStarredMail(mail) {
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
    }

    function setingUnReadCount(mails) {
        return mails.reduce((acc, mail) => {
            if (!mail.isRead) acc++
            return acc
        }, 0)
    }

    function setingStarredCount(mails) {
        return mails.reduce((acc, mail) => {
            if (mail.isStarred) acc++
            return acc
        }, 0)
    }

    function setingDraftCount(mails) {
        return mails.reduce((acc, mail) => {
            if (!mail.sentAt && mail.from === 'user@appsus.com') acc++
            return acc
        }, 0)
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }

    if (!mails) return <h2>Loading</h2>
    return (
        <div className='mails-container grid'>
            <button className="btn-toggle-menu btn" >☰</button>
            {/* onClick={toggleMenu()} */}
            <img src="./assets/img/logo_gmail_lockup_default_1x_r5.png" className="logo" />
            <FilterMails onSetFilter={onSetFilter} filterBy={filterBy} />
            {!selectedMailId && (
                <MailList
                    mails={mails}
                    onRemove={removeMail}
                    onSelectMail={onSelectedMailId}
                    onReadMail={onReadMail}
                    onStarredMail={onStarredMail} />
            )}
            {selectedMailId &&
                navigate(`/mail/${selectedMailId}`)
                // <Link to={`/mail/${selectedMailId}`}></Link>
                // <MailDetails
                // mailId={selectedMailId}
                // onGoBack={() => setSelectedMailId(null)} />
            }
            <div className='mail-folder-list'>
                <Link to="/mail/compose"><button className='btn blue-btn Compose-btn'>✏️  Compose</button></Link>
                <MailFolderList unReadCount={setingUnReadCount(mails)}
                    starredCount={setingStarredCount(mails)}
                    draftCount={setingDraftCount(mails)}
                    onSetFilter={onSetFilter}
                    filterBy={filterBy} />
                {/* <MailCompose /> */}
            </div>
        </div>
    )
}

