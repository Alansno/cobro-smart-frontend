import '../assets/styles/dash.css'
import { Link } from "react-router-dom";
import { useLogout } from '../service/login';
import useAuthProvider from '../store/AuthProvider';

function Navbar() {

  const logoutNow = useLogout();
  const {logout,token,user} = useAuthProvider()

  const logoutUser = async () => {
    try {
      // Solo intenta cerrar sesión si hay un token disponible
      if (token) {
        await logoutNow.mutate();
      }

      logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary nav-mobile">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">CobroSmart</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav nav-responsive">
      <li className="nav-item dropdown">
          {user && user.username && (
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.username}
            </a>
          )}
          <ul className="dropdown-menu drop-mobile">
            <li><Link to={'/perfil'} className='dropdown-item'>Ver perfil</Link></li>
            {user && user.nameRole === 'Admin' &&(
              <li><Link to={'/agregar-cuenta'} className="dropdown-item">Agregar cuenta</Link></li>
            )}
            <li className="dropdown-item logout" onClick={logoutUser}>Cerrar sesión</li>
          </ul>
        </li>
            <li className='nav-link'><Link className='nav-item' to={'/inicio'}>Inicio</Link></li>
            <li className='nav-link'><Link className='nav-item' to={'/clientes'}>Clientes</Link></li>
            <li className='nav-link'><Link className='nav-item' to={'/agregar-cliente'}>Agregar clientes</Link></li>
            <li className='nav-link'><Link className='nav-item' to={'/agregar-cuentas'}>Agregar cuenta</Link></li>
            <li className='nav-link'><Link className='nav-item' to={'/servicios'}>Servicios</Link></li>
            <li className='nav-link'><Link className='nav-item' to={'/agregar-servicio'}>Agregar servicio</Link></li>
      </ul>
      </div>
</div>
</nav>
  )
}

export default Navbar