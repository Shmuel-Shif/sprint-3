const { useState, useEffect } = React

export function MailFolderList({unReadCount ,starredCount , draftCount, filterBy, onSetFilter}){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        // target.classList.add("selected")
        const { name: field, value, type } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function onSortBy({ target }) {
    //     // ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }

    return <ul className='mail-folder flex column clean-list'>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'inbox' } })} className='selected'>Inbox   <span>   {(unReadCount) ? unReadCount : ''}</span></li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'starred'}})}>Starred<span>   {(starredCount) ? starredCount : ''}</span></li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'sent' } })}>Sent</li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'draft' } })}>Draft <span>   {(draftCount) ? draftCount : ''}</span></li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'trash' } })}>Trash</li>
    </ul>
}