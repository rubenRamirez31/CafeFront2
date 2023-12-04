import Link from "next/link"

const NavBarComponent = () => {
  return (
    <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Aqui ingresan los admin</a>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/Productos"></Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" href="/Tiendas"></Link>
                </li>
        
            </ul>
        </div>
    </nav>  
  )
}

export default NavBarComponent