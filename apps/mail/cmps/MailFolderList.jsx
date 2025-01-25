const { useState, useEffect } = React

export function MailFolderList({ unReadCount, starredCount, draftCount, filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    // const [readType, setReadType] = useState('all')

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        // target.classList.add("selected")
        const { name: field, value, type } = target
        console.log(value, field)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        // if (field === 'isRead')  setReadType(value)
    }

    // function onSortBy({ target }) {
    //     // ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }

    // function handleChangeRead({ target }) {
    //     const { name: field, value, type } = target

    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }
    
    return <section><ul className='mail-folder flex column clean-list'>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'inbox' } })} className='selected'>Inbox   <span>   {(unReadCount) ? unReadCount : ''}</span></li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'starred' } })}>Starred<span>   {(starredCount) ? starredCount : ''}</span></li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'sent' } })}>Sent</li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'draft' } })}>Draft <span>   {(draftCount) ? draftCount : ''}</span></li>
        <li onClick={() => handleChange({ target: { name: 'status', value: 'trash' } })}>Trash</li>
    </ul>
        {/* <article>
            <div>
                <input onChange={handleChange} type="radio" id="all" name="isRead" value={''} checked={readType === 'all'} />
                <label htmlFor="all">All</label>
            </div>

            <div>
                <input onChange={handleChange} type="radio" id="read" name="isRead" value={true} checked={readType === 'read'} />
                <label htmlFor="read">Read</label>
            </div>

            <div>
                <input onChange={handleChange} type="radio" id="unread" name="isRead" value={false} checked={readType === 'unread'} />
                <label htmlFor="unread">Unread</label>
            </div>
        </article> */}
    </section>


}