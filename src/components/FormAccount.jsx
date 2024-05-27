import { useState } from 'react'
import '../assets/styles/formClient.css'
import { addAccount } from '../service/account'
import useAuthProvider from '../store/AuthProvider'
import Swal from 'sweetalert2'
import eyeOn from '../assets/img/eye.svg'
import eyeOff from '../assets/img/eye-slash.svg'

function FormAccount() {

const [nameUser, setNameUser] = useState("")
const [emailUser, setEmailUser] = useState("")
const [phoneUser, setPhoneUser] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [active, setActive] = useState(false)
const [alert, setAlert] = useState({})
const [bad, setBad] = useState({})
const {token} = useAuthProvider()

const handleSubmit = (e) => {
    e.preventDefault()

    const account = {
        nameUser,
        emailUser,
        phoneUser,
        username,
        password
    }

    const fetchData = async () => {
        try {
          const data = await addAccount(account,token);
          setAlert(data)
        } catch (error) {
          console.log(error)
          setBad(error)
        }
      };
      fetchData();
}

    if (alert && alert.message) {
        Swal.fire({
            icon: "success",
            title: "Cuenta añadida correctamente",
            showConfirmButton: false,
            timer: 1500
          });
    }

    const changeInput = () => {
      setActive(!active)
    }

  return (
    <div className="bg-form-client">
        <form className="p-5 form-client" onSubmit={handleSubmit}>
        <h2 className="text-center">Agregar cuenta</h2>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" value={nameUser} onChange={(e) => setNameUser(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
    <input type="email" className="form-control" aria-describedby="emailHelp" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Teléfono</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" value={phoneUser} onChange={(e) => setPhoneUser(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Nombre de usuario</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Contraseña</label>
    <div className="password-container">
    <input type={active ? "text": "password"} className="form-control password-input" id="exampleInputPassword1" value={password} onChange={ (e) => setPassword(e.target.value)} required/>
    <img className="eye-icon" src={active ? eyeOff: eyeOn} alt="" onClick={changeInput}/>
    </div>
  </div>
  <div className="d-flex justify-content-center mb-3">
  <button type="submit" className="btn btn-success">Guardar</button>
  </div>
  {bad.response && Object.values(bad.response.data.message).map((alert, index) => (
      <div key={index} className="alert alert-warning">{alert}</div>
    ))}
    {alert.alert && (
 <div className="alert alert-warning">{alert.alert}</div>
    )}
</form>
    </div>
  )
}

export default FormAccount