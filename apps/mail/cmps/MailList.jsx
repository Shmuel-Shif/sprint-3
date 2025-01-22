import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemove }) {
    return ( <section className='mails-list'>
        <ul>
            {mails.map(mail => {
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <button onClick={() => onRemove(mail.id)}>🗑️</button>
                </li>
            })}
        </ul>
    </section>
    )
}
