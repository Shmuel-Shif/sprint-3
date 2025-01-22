export function MailPreview({ mail,onSelectMail }) {
    return <article className={`mail-preview grid ${(mail.isRead) ? 'read' : ''}`} onClick={() => onSelectMail(mail.id)}>
        <span className='mail-preview-from'>{mail.from}</span>
        <div className='mail-preview-subject'>
        <p><span className='bold'>{mail.subject}</span><span className='gray'> - {mail.body}</span></p>
        </div>
        <span className='mail-preview-date'>{`${new Date(mail.sentAt).toDateString()}`}</span>
        {/* <button onClick={() => onRemove(mail.id)}>🗑️</button> */}
    </article>
}
