export function MailPreview({ mail }) {
    return <article className={`mail-preview ${(mail.isRead) ?'read' : ''}`}>
        <h5 className='mail-preview-from'>{mail.from}</h5>
        <div className='mail-preview-subject'>
        <h5 >{mail.subject}</h5>
        <p>{mail.body}</p>
        </div>
        <h5 className='mail-preview-date'>{`${new Date(mail.sentAt).toDateString()}`}</h5>
    </article>
}
