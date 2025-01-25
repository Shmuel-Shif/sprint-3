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
       
        <form onSubmit={onSave} className="mail-form flex column align-center">
            {/* <label className='bold-txt' htmlFor="From">From</label>
            <input onChange={handleChange} value={From}
                id='From' type="text" name='From' /> */}
                 <span className='new-massage'>New Massage    <Link to='/mail'><i className="fa-solid fa-xmark"></i></Link></span>
            <div>
                {/* <label className='to-mail-label' htmlFor="to">To  </label> */}
                <input className='to-mail' onChange={handleChange} value={to}
                    id='to' type="email" name='to' placeholder='To'/></div>

            <input className='mail-subject'onChange={handleChange} value={subject}
                id='subject' type="text" name='subject' placeholder='Subject' />

            <textarea className="mail-body" onChange={handleChange} value={body}
                id='body' type="text" name='body'></textarea>
            <button className='send-btn btn blue-btn'>Send</button>
        </form>
    </section>
}
