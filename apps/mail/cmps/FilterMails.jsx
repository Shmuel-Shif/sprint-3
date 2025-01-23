const { useState, useEffect } = React

export function FilterMails({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log(target)
        let { name: field, value, type } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log('Submit filter')
        onSetFilter(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return <div className='filter-mails'>
        <form onSubmit={onSubmit}><input
            type="text"
            placeholder="Search mails..."
            name="txt"
            value={txt}
            onChange={handleChange}
        />
        </form>
    </div>
}
