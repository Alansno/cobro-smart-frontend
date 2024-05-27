import { useState } from 'react'
import '../assets/styles/formClient.css'
import useAuthProvider from '../store/AuthProvider'
import Swal from 'sweetalert2'
import { addAccounts } from '../service/accounts'

function FormAccounts() {

const [nameAccount, setNameAccount] = useState("")
const [alert, setAlert] = useState({})
const [bad, setBad] = useState({})
const {token} = useAuthProvider()

const handleSubmit = (e) => {
    e.preventDefault()

    console.log(nameAccount)

    const fetchData = async () => {
        try {
          const data = await addAccounts({nameAccount},token);
          console.log(data)
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

  return (
    <div className="bg-form-client">
        <form className="p-5 form-client" onSubmit={handleSubmit}>
        <h2 className="text-center">Agregar cuenta receptora</h2>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Cuenta receptora</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} required/>
  </div>
  <div className="d-flex justify-content-center mb-3">
  <button type="submit" className="btn btn-success">Guardar</button>
  </div>
  {bad.response && Object.values(bad.response.data.message).map((alert, index) => (
      <div key={index} className="alert alert-warning">{alert}</div>
    ))}
    {alert.error && (
 <div className="alert alert-warning">{alert.error}</div>
    )}
</form>
    </div>
  )
}

export default FormAccounts