import '../assets/styles/dash.css'
import { Link } from "react-router-dom";
import { useLogout } from '../service/login';
import useAuthProvider from '../store/AuthProvider';

function DashOptions() {
  const logoutNow = useLogout();
  const { logout,token,user } = useAuthProvider();

  
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
    <div className="dash-options">
      <div className='dash-user'>
        <img src="" alt="" />
          {user && user.username && (
            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.username}
            </a>
          )}
          <ul className="dropdown-menu">
            <li><Link to={'/perfil'} className='dropdown-item'>Ver perfil</Link></li>
            {user && user.role === 'Admin' &&(
              <li><Link to={'/agregar-cuenta'} className="dropdown-item">Agregar cuenta</Link></li>
            )}
            <li className="dropdown-item logout" onClick={logoutUser}>Cerrar sesión</li>
          </ul>
      </div>  
      <hr className='space'/>
      <div className='dash-menu'>
        <ul className='dash-list'>
            <li><Link to={'/inicio'}>Inicio</Link></li>
            <li><Link to={'/clientes'}>Clientes</Link></li>
            <li><Link to={'/agregar-cliente'}>Agregar clientes</Link></li>
            <li><Link to={'/agregar-cuentas'}>Agregar cuenta</Link></li>
            <li><Link to={'/servicios'}>Servicios</Link></li>
            <li><Link to={'/agregar-servicio'}>Agregar servicio</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default DashOptions