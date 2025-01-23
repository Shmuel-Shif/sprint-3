import { mailService } from "../services/mail.service.js"


const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

const { Link, useSearchParams } = ReactRouterDOM

export function MailCompose() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const params = useParams()
    const navigate = useNavigate()

    function onSave(ev) {
        ev.preventDefault()
        mailService.save(mail)
            .then(navigate('/mail'))
        // .then(() => showSuccessMsg('Book has successfully saved!'))
        // .catch(() => showErrorMsg(`couldn't save book`))
        // .finally(() => navigate('/mail'))
    }

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        // switch (type) {
        //     case 'range':
        //     case 'number':
        //         value = +value
        //         break;

        //     case 'checkbox':
        //         value = target.checked
        //         break;
        // }
        setMail(prevMail => ({ ...prevMail, [field]: value }))
    }


    const { to, subject, body } = mail
    return <section>
        <form onSubmit={onSave}>
            {/* <label className='bold-txt' htmlFor="From">From</label>
            <input onChange={handleChange} value={From}
                id='From' type="text" name='From' /> */}

            <label className='bold-txt' htmlFor="to">To</label>
            <input onChange={handleChange} value={to}
                id='to' type="email" name='to' />

            <input onChange={handleChange} value={subject}
                id='subject' type="text" name='subject' placeholder='Subject' />

            <input onChange={handleChange} value={body}
                id='body' type="text" name='body' />
           <button>Send</button>
        </form>
    </section>
}
