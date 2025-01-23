import { mailService } from "../services/mail.service.js"


const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then((mail) => {
                mail.isRead = true
                setMail(mail)
            })
            .catch(() => {
                // showErrorMsg('Couldnt get mail...')
                navigate(`/mail`)
            })
    }

    function removeMailD(mailId) {
        mailService.remove(mailId)
            .then(() => {
                // setMail(mails => mails.filter(mail => mail.id !== mailId))
                // showSuccessMsg(`mail removed successfully!`)
                navigate(`/mail`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                // showErrorMsg(`Problems removing mail (${mailId})`)
            })

    }

    if (!mail) return
    return <section className='mails-list'>
        <button className='close btn'>
            <Link to='/mail'>X</Link>
        </button>
        <nav className='mail-details-nav'>
            <Link to={`/mail/${mail.prevMailId}`}>
                <button className='btn'><i className="fa-solid fa-arrow-left"></i></button>
            </Link>
            <Link to={`/mail/${mail.nextMailId}`}>
                <button className='btn'><i className="fa-solid fa-arrow-right"></i></button>
            </Link>
        </nav>
        <div className='bold'>{mail.subject}</div>
        <div>
            <div><span className='bold'>{mail.from}</span>{`   ${new Date(mail.sentAt).toDateString()}`}</div>
        </div>
        <div>{mail.to}</div>
        <div>{mail.body}</div>
        <button className='btn' onClick={() => removeMailD(mail.id)}>🗑️</button>

    </section>
}