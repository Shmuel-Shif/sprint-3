const { useState, useEffect } = React

export function FilterMails({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return <div className='filter-mails'>
        <form onSubmit={onSubmit}>
            <input className='search-bar'
            type="text"
            placeholder="🔍 Search mail"
            name="txt"
            value={txt}
            onChange={handleChange}
        />
        </form>
    </div>
}
