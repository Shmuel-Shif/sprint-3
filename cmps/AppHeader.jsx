const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>Appsus</h3>
        </Link>
        <nav>
        <NavLink to="/">
                <img src="./assets/img/png-clipart-logo-house-home-house-angle-building-thumbnail.png" alt="Home" title="Home" className="kink-a" />
            </NavLink>
            <NavLink to="/about">
                <img src="./assets/img/blue-vector-penrose-triangle-top-view-isolated-transparent-background_1292771-4616.png" alt="About" title="About" className="kink-a" />
            </NavLink>
            <NavLink to="/mail">
                <img src="./assets/img/Gmail_icon_(2020).svg.webp" alt="Mail" title="Mail" className="kink-a" />
            </NavLink>
            <NavLink to="/note">
                <img src="./assets/img/keep-512.png" alt="Keep" title="Keep" className="kink-a" />
            </NavLink>
        </nav>
    </header>
}
