import { useParams } from "react-router-dom"
import useAuthProvider from "../store/AuthProvider"
import { useEffect, useState } from "react"
import { getServiceId } from "../service/services"
import { addRecord } from "../service/records"
import Swal from "sweetalert2"

function FormRecord({idService}) {

  const {token} = useAuthProvider()
  const [service, setService] = useState({})
  const [id, setId] = useState("")
  const [subtotal, setSubtotal] = useState("")
  const [iva, setIva] = useState("")
  const [nameAccount, setNameAccount] = useState("")
  const [payment, setPayment] = useState("")
  const [typeIncome, setTypeIncome] = useState("")
  const [wallet, setWallet] = useState("")
  const [comments, setComments] = useState("")
  const [alert, setAlert] = useState({})
  const [bad, setBad] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServiceId(idService,token);
        if (data.message) {
          setId(data.message.id);
          setService(data);
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [idService,token])

  const handleSubmit = (e) => {
    e.preventDefault()

    const subtotalRegis = parseFloat(subtotal)
    const ivaRegis = parseFloat(iva)

    const record = {
      id,
      subtotalRegis,
      ivaRegis,
      nameAccount,
      payment,
      typeIncome,
      wallet,
      comments
    }
    const fetchData = async () => {
      try {
        const data = await addRecord(record,token);
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
        title: alert.message,
        showConfirmButton: false,
        timer: 1500
      });
}


  return (
    <div className="bg-form-client">
        <form className="p-5 form-client" onSubmit={handleSubmit}>
        <h2 className="text-center">Agregar registro</h2>
    {service && service.message &&(
        <>
        <div className="mb-3">
          <input className="form-label" type="text" value={service.message ? service.message.id : ''} onChange={(e) => setId(e.target.value)} readOnly hidden/>
      </div>
      <div className="mb-3">
      <input className="form-control" type="text" value={service.message.typeService} readOnly/>
  </div>
        </>
    )}
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Subtotal</label>
    <input type="number" step={0.01} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={subtotal} onChange={(e) => setSubtotal(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">IVA</label>
    <input type="number" step={0.01} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={iva} onChange={(e) => setIva(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Cuenta receptora</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={nameAccount} onChange={(e) => setNameAccount(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Método de pago</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={payment} onChange={(e) => setPayment(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Tipo de ingreso</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={typeIncome} onChange={(e) => setTypeIncome(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Cartera</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={wallet} onChange={(e) => setWallet(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Comentarios</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={comments} onChange={(e) => setComments(e.target.value)} required/>
  </div>
  <div className="d-flex justify-content-center mb-3">
  <button type="submit" className="btn btn-success">Guardar</button>
  </div>
  {bad.response && Object.values(bad.response.data.message).map((alert, index) => (
      <div key={index} className="alert alert-warning">{alert}</div>
    ))}
    {alert && alert.alert && (
      <div className="alert alert-danger" role="alert">
      {alert.alert}
    </div>
    )}
</form>
    </div>
  )
}

export default FormRecord