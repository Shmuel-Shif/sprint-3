
export function NoteHeader ({ searchTerm, handleSearchChange }){
    return (
        <header className="header-keep">
        <div className="box-keep">
            <span className="Hamburger-list">&#9776;</span>
            <img 
                src="./assets/img/keep-512.png" 
                alt="Header icon" 
                className="header-image"
            />

            <h6 className="name-logo">Keep</h6>
        </div>
            <input
                type="text"
                placeholder="🔍Search notes..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

        <nav>
            <img 
                src="./assets/img/google-apps-svgrepo-com.svg" 
                alt="Header icon" 
                className="header-none"
            />

            <img 
                src="./assets/img/list-view-svgrepo-com.svg" 
                alt="Header icon" 
                className="header-none"
            />

            <img 
                src="./assets/img/circular-refreshment-arrow-svgrepo-com.svg" 
                alt="Header icon" 
                className="header-none"
            />
        </nav>
        </header>
    )
}

