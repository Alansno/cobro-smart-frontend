import { useState, useEffect } from "react"
import { autenticate } from "../service/login";
import useAuthProvider from "../store/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import eyeOn from '../assets/img/eye.svg'
import eyeOff from '../assets/img/eye-slash.svg' 

function FormLogin() {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [err, setErr] = useState({})
  const [active, setActive] = useState(false)
  const navigate = useNavigate()

  const { isAuth, login, addUser } = useAuthProvider();

  const handleSubmit = (e) => {

    e.preventDefault();

    const credentials = {
      username,
      password
  }

  const fetchData = async () => {
      try {
        const data = await autenticate(credentials)
        const token = data.message.jwt
        const user = data.message.user

        if (token) {
          login(token)
          addUser(user)
        }
      } catch (error) {
        setErr(error)
      }
    };
    fetchData();
  }

  useEffect(() => {
    if (isAuth === true) {
      navigate("/inicio");
    }
  }, [isAuth, navigate]);


  const changeInput = () => {
    setActive(!active)
  }

  return (
    <form className="p-5 form-bg" onSubmit={handleSubmit}>
        <h2 className="text-center formLogin-color">Bienvenido (a)</h2>
        <h5 className="text-center mb-5">Ingrese a su cuenta</h5>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-body-secondary">Usuario</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ (e) => setUsername(e.target.value) } required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-body-secondary">Contraseña</label>
    <div className="password-container">
    <input type={active ? "text": "password"} className="form-control password-input" id="exampleInputPassword1" onChange={ (e) => setPassword(e.target.value)} required/>
    <img className="eye-icon" src={active ? eyeOff: eyeOn} alt="" onClick={changeInput}/>
    </div>
  </div>
  <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-primary">Iniciar sesión</button>
  </div>
  <hr />
  <div className="d-flex justify-content-center gap-5 mt-5">
  <Link to={'/registrate'}>Regístrate</Link>
    <p>¿Olvidaste tu contraseña?</p>
  </div>
  <div>
  {err && err.response && (
          <div className="alert alert-danger">{err.response.data.message}</div>
        )}
  </div>
</form>
  )
}

export default FormLogin