import { useState } from 'react'
import '../assets/styles/register.css'
import { singUp, useRegister } from '../service/login';
import Swal from 'sweetalert2';
import eyeOn from '../assets/img/eye.svg'
import eyeOff from '../assets/img/eye-slash.svg'

function Register() {

  const [ username, setUsername ] = useState("");
  const [ nameCompany, setNameCompany ] = useState("");
  const [ addressCompany, setAddressCompany ] = useState("");
  const [ rfc, setRfc ] = useState("");
  const [ emailCompany, setEmailCompany ] = useState("");
  const [ phoneCompany, setPhoneCompany ] = useState("");
  const [ typeIndustry, setTypeIndustry ] = useState("");
  const [ password, setPassword ] = useState("");
  const [active, setActive] = useState(false)
  const [nice, setNice] = useState({})
  const [err, setErr] = useState({})

  const handleSubmit = (e) => {

    e.preventDefault();
    
    const fetchData = async () => {
      try {
        const data = await singUp({username,nameCompany,addressCompany,rfc,emailCompany,phoneCompany,typeIndustry,password})
    
        console.log(data)
        setNice(data)
      } catch (error) {
        setErr(error)
      }
    };
    fetchData();
  }

  if (nice && nice.message) {
    Swal.fire({
        icon: "success",
        title: "Cuenta regístrada correctamente",
        showConfirmButton: false,
        timer: 1500
      });
}

const changeInput = () => {
  setActive(!active)
}

  return (
    <div className="bg-form">
        <form className="p-5 form-register" onSubmit={handleSubmit}>
        <h2 className="text-center mb-5 formRegister-color">Regístrate</h2>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Nombre de usuario: Ej. AlanSnow' onChange={(e) => setUsername(e.target.value)} value={username}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control"  placeholder='Nombre de la empresa: Ej. Empresa S.A DE C.V' onChange={(e) => setNameCompany(e.target.value)} value={nameCompany}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Direccion:' onChange={(e) => setAddressCompany(e.target.value)} value={addressCompany}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='RFC: Ej. ABCD1234567H0' onChange={(e) => setRfc(e.target.value)} value={rfc}/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control"  placeholder='Correo electrónico:' onChange={(e) => setEmailCompany(e.target.value)} value={emailCompany}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Teléfono: Ej. +52 961-736-2980' onChange={(e) => setPhoneCompany(e.target.value)} value={phoneCompany}/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Giro de la empresa: Ej. Contabilidad' onChange={(e) => setTypeIndustry(e.target.value)} value={typeIndustry}/>
  </div>
  <div className="mb-3">
  <div className="password-container">
    <input type={active ? "text": "password"} className="form-control password-input" id="exampleInputPassword1" value={password} onChange={ (e) => setPassword(e.target.value)} required placeholder='Contraseña:'/>
    <img className="eye-icon" src={active ? eyeOff: eyeOn} alt="" onClick={changeInput}/>
    </div>
  </div>
  <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-success">Guardar</button>
  </div>
  {err.response && Object.values(err.response.data.message).map((alert, index) => (
      <div key={index} className="alert alert-warning">{alert}</div>
    ))}
  <div>
  {nice && nice.alert && (
          <div className="alert alert-danger">{nice.alert}</div>
        )}
  </div>
</form>
    </div>
  )
}

export default Register