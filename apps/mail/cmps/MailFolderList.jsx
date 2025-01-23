export function MailFolderList({unReadCount ,starredCount , draftCount}){


    return <ul className='mail-folder flex column clean-list'>
        <li>Inbox   <span>   {(unReadCount) ? unReadCount : ''}</span></li>
        <li>Starred<span>   {(starredCount) ? starredCount : ''}</span></li>
        <li>Sent</li>
        <li>Draft <span>   {(draftCount) ? draftCount : ''}</span></li>
        <li>Trash</li>
    </ul>
}