export function MailFolderList({unReadCount}){
    return <ul className=' flex column clean-list'>
        <li> inbox   <span>   {unReadCount}</span></li>
        <li>sent</li>
        <li>trash</li>
        <li>draft</li>
    </ul>
}