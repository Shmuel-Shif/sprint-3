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

    function removeMail() {
        console.log('removed!!!')
    }

    function onSelectedMailId(mailId) {
        // setSelectedMailId(mailId)
        navigate(`/mail/${mailId}`)

    }

    function setingUnReadCount(mails) {
        return mails.reduce((acc, mail) => {
            if (!mail.isRead) acc++
            return acc
        }, 0)
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }

    if (!mails) return <h2>Loading</h2>
    return (
        <div className='mails-container grid'>
            <button className="btn-toggle-menu" >☰</button>
            {/* onClick={toggleMenu()} */}
            <img src="../assets/img/Gmail_icon_(2020).svg.webp" className="logo" />
            <FilterMails onSetFilter={onSetFilter} filterBy={filterBy}/>
            {!selectedMailId && (
                <MailList
                    mails={mails}
                    onRemove={removeMail}
                    onSelectMail={onSelectedMailId} />)}
            {selectedMailId &&
               navigate(`/mail/${selectedMailId}`)
                // <Link to={`/mail/${selectedMailId}`}></Link>
                // <MailDetails
                // mailId={selectedMailId}
                // onGoBack={() => setSelectedMailId(null)} />
            }
            <div className='mail-folder-list'>
            <Link to="/mail/compose"><button className='add-book'>📧Compose</button></Link>
                <MailFolderList unReadCount={setingUnReadCount(mails)} />
                {/* <MailCompose /> */}
            </div>
        </div>
    )
}

