
export function NoteHeader ({ searchTerm, handleSearchChange }){
    return (
        <header className="header-keep">
            <span className="Hamburger-list">&#9776;</span>
            <img 
                src="./assets/img/keep-512.png" 
                alt="Header icon" 
                className="header-image"
            />

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

