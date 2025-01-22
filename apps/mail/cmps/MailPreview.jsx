export function MailPreview({ mail }) {
    return <article className={`mail-preview grid ${(mail.isRead) ? 'read' : ''}`}>
        <span className='mail-preview-from'>{mail.from}</span>
        <div className='mail-preview-subject'>
        <span>{mail.subject}<span>{mail.body}</span></span>
        </div>
        <span className='mail-preview-date'>{`${new Date(mail.sentAt).toDateString()}`}</span>
        {/* <button onClick={() => onRemove(mail.id)}>🗑️</button> */}
    </article>
}
