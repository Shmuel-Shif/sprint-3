const { useState, useEffect } = React

export function MailFolderList({unReadCount ,starredCount , draftCount, filterBy, onSetFilter}){

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log(target)
        let { name: field, value, type } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function onSortBy({ target }) {
    //     // ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }

    return <ul className='mail-folder flex column clean-list'>
        <li onClick={handleChange} className='selected'>Inbox   <span>   {(unReadCount) ? unReadCount : ''}</span></li>
        <li onClick={handleChange} name='isStarred' value={true}>Starred<span>   {(starredCount) ? starredCount : ''}</span></li>
        <li onClick={handleChange} name='from' value='user@appsus.coml'>Sent</li>
        <li onClick={handleChange}name='sendAt' value={false}>Draft <span>   {(draftCount) ? draftCount : ''}</span></li>
        <li onClick={handleChange}>Trash</li>
    </ul>
}