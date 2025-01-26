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

    function removeMailD(mail) {
         mail.isTrash = true
        mailService.save(mail)
        // mailService.remove(mailId)
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
    return <section className='mail-detail'>
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
        <article className='mail-inside'>
        <div className='bold'>{mail.subject}</div>
        <div>
            <div><span className='bold'>{mail.from}</span>{`   ${new Date(mail.sentAt).toDateString()}`}</div>
        </div>
        <div className="mails">{mail.to}</div>
        <br />
        <br />
        <div className="mail-text">{mail.body}</div>
        <br />
        <br />
        </article>
        <button className='btn' onClick={() => removeMailD(mail)}><i className="fa-solid fa-trash"></i></button>

    </section>
}