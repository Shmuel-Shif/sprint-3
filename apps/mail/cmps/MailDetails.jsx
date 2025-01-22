// • Routable component (page)
// • show the entire mail
// • Allow deleting a mail (using the service)
// • Allow navigating back to the list

export function MailDetails({mail}) {
    return <section>
        <div>mail.from</div>
        <div>mail.to</div>
        <div>mail.subject</div>
        <div>mail.body</div>
        <div>mail.sentAt</div>
    </section>
}