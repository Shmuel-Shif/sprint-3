
// • Allow deleting a mail (using the service)

import { mailService } from "../services/mail.service.js"

// • Allow navigating back to the list
const { useState, useEffect } = React

export function MailDetails({ mailId, onGoBack }) {
    console.log(mailId)
    const [mail, setMail] = useState(null)

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('err : ', err)
            })
    }

    if (!mail) return
    return <section className='mails-list'>
        <button onClick={onGoBack}>🔙</button>
        <div className='bold'>{mail.subject}</div>
        <div>
            <div><span className='bold'>{mail.from}</span>{`   ${new Date(mail.sentAt).toDateString()}`}</div>
        </div>
        <div>{mail.to}</div>
        <div>{mail.body}</div>

    </section>
}