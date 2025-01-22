// • Routable component (page)
// • show the entire mail
// • Allow deleting a mail (using the service)

import { mailService } from "../services/mail.service.js"

// • Allow navigating back to the list
const { useState, useEffect } = React

export function MailDetails({mailId , onGoBack}) {
console.log(mailId)
const [mail, setMail] = useState(null)

useEffect(()=> {
    loadMail()
},[])

function loadMail(){
    mailService.get(mailId)
    .then(setMail)
    .catch(err => {
        console.log('err : ', err)
    })
}

if (!mail) return
return <section className='mails-list'>
        <button onClick={onGoBack}>🔙</button>
        <div>{mail.from}</div>
        <div>{mail.to}</div>
        <div>{mail.subject}</div>
        <div>{mail.body}</div>
        <div>{mail.sentAt}</div>
    </section>
}