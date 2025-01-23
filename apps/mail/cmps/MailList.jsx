import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemove, onSelectMail, onReadMail }) {
    return (<section className='mails-list'>
        <ul className='clean-list grid'>
            {mails.map(mail =>
                <li key={mail.id} >
                    <MailPreview
                        mail={mail}
                        onRemove={onRemove}
                        onSelectMail={onSelectMail}
                        onReadMail={onReadMail} />
                </li>
            )}
        </ul>
    </section>
    )
}
