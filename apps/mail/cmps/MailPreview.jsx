
const { useEffect, useState } = React
export function MailPreview({ mail,onSelectMail, onRemove }) {
    const [isOver, setIsOver]= useState(false)

    function onSetRemove(ev){
        ev.stopPropagation()
        onRemove(mail.id)
    }

    function onSetIsOver(){
        setIsOver((isOver) => !isOver)
    }

    return <article className={`mail-preview grid ${(mail.isRead) ? 'read' : ''}`}
     onClick={() => onSelectMail(mail.id)}
     onMouseOver={() =>setIsOver(true)} 
     onMouseOut={() =>setIsOver(false)} >
        <span className='mail-preview-from'>{mail.from}</span>
        <div className='mail-preview-subject'>
        <p><span className='bold'>{mail.subject}</span><span className='gray'> - {mail.body}</span></p>
        </div>
        {!isOver && <span className='mail-preview-date'>{`${new Date(mail.sentAt).toDateString()}`}</span>}
        {isOver && <div className='buttens flex align-center space-between' >
        <button onClick={onSetRemove}>🗑️</button>
        <button onClick={onSetRemove}>📧</button></div>}
    </article>
}
