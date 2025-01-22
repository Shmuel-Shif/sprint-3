export function MailPreview({ mail }) {
    console.log(mail)
    return <article >
        <h3>{mail.from}</h3>
        <h5>{mail.subject}</h5>
        <p>{mail.body}</p>
        <h5>{`${new Date(mail.sentAt).toDateString()}`}</h5>
    </article>

// className={`${mail.isRead && 'read'}`}
}
