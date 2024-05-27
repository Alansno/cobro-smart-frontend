import { useState, useEffect } from 'react'
import '../assets/styles/formClient.css'
import { addClient } from '../service/clients'
import useAuthProvider from '../store/AuthProvider'
import Swal from 'sweetalert2'

function FormClient() {

    const [nameClient, setNameClient] = useState("")
    const [addressClient, setAddressClient] = useState("")
    const [phoneClient, setPhoneClient] = useState("")
    const [emailClient, setEmailClient] = useState("")
    const [alert, setAlert] = useState({})
    const [good, setGood] = useState({})
    const {token} = useAuthProvider()

    useEffect(() => {
      if (alert.response) {

        const timer = setTimeout(() => {
          setAlert({});
        }, 5000);
  
        return () => clearTimeout(timer);
      }
    }, [alert]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const client = {
            nameClient,
            addressClient,
            phoneClient,
            emailClient
        }

        const fetchData = async () => {
            try {
              const data = await addClient(token,client);
              setGood(data)
              console.log(good)
            } catch (error) {
              setAlert(error)
              console.log(error)
            }
          };
          fetchData();
    }

    if (good && good.message) {
      Swal.fire({
          icon: "success",
          title: "Cliente agregado correctamente",
          showConfirmButton: false,
          timer: 1500
        });
  }

  return (
    <div className="bg-form-client">
        <form className="p-5 form-client" onSubmit={handleSubmit}>
        <h2 className="text-center mb-5">Agregar cliente</h2>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Nombre del cliente</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={nameClient} onChange={(e) => setNameClient(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Dirección</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={addressClient} onChange={(e) => setAddressClient(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Teléfono</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={phoneClient} onChange={(e) => setPhoneClient(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={emailClient} onChange={(e) => setEmailClient(e.target.value)} required/>
  </div>
  <div className="d-flex justify-content-center mb-3">
  <button type="submit" className="btn btn-success">Guardar</button>
  </div>
  {alert.response &&
          Object.values(alert.response.data.message).map((alert, index) => (
            <div key={index} className="alert alert-warning">
              {alert}
            </div>
          ))}
</form>
    </div>
  )
}

export default FormClient