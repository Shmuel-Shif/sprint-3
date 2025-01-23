
const { useEffect, useState } = React
export function MailPreview({ mail,onSelectMail, onRemove , onReadMail }) {
    const [isOver, setIsOver]= useState(false)

    function onSetRemove(ev){
        ev.stopPropagation()
        onRemove(mail.id)
    }

    function onSetReadMail(ev){
        ev.stopPropagation()
        onReadMail(mail)
    }

    return <article className={`mail-preview grid ${(mail.isRead) ? 'read' : ''}`}
     onClick={() => onSelectMail(mail)}
     onMouseOver={() =>setIsOver(true)} 
     onMouseOut={() =>setIsOver(false)} >
        <span className='mail-preview-from'>{mail.from}</span>
        <div className='mail-preview-subject'>
        <p><span className='bold'>{mail.subject}</span><span className='gray'> - {mail.body}</span></p>
        </div>
        {!isOver && <span className='mail-preview-date'>{`${new Date(mail.sentAt).toDateString()}`}</span>}
        {isOver && <div className='buttens flex align-center space-between' >
        <button className='btn' onClick={onSetRemove}>🗑️</button>
        <button className='btn' onClick={onSetReadMail}>📧</button></div>}
    </article>
}
