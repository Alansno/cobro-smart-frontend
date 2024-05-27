import { useState, useEffect } from "react"
import { getClients } from "../service/clients"
import useAuthProvider from "../store/AuthProvider"
import { addService } from "../service/services"
import '../assets/styles/formClient.css'
import Swal from "sweetalert2"

function FormService() {

const [client, setClient] = useState({}) 
const [idd, setIdd] = useState("")
const [typeDocument, setTypeDocument] = useState("")
const [dateInvoicing, setDateInvoicing] = useState("")
const [subtotalServicee, setSubtotalServicee] = useState("")
const [ivaServicee, setIvaServicee] = useState("")
const [description, setDescription] = useState("")
const [typeService, setTypeService] = useState("")
const [unitBusiness, setUnitBusiness] = useState("")
const {token} = useAuthProvider()
const [alert, setAlert] = useState({})
const [bad, setBad] = useState({})

useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClients(token);
        setClient(data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [token]);

const handleSubmit = (e) => {
    e.preventDefault()
    const id = parseInt(idd);
    var fechaFront = "04/10/2024";

// Separar la fecha en día, mes y año
const partesFecha = fechaFront.split("/");
const dia = partesFecha[1];
const mes = partesFecha[0];
const año = partesFecha[2];

// Crear una nueva fecha en formato ISO
setDateInvoicing(año + "-" + mes + "-" + dia)

  const subtotalService = parseFloat(subtotalServicee)
  const ivaService = parseFloat(ivaServicee)

    const service = {
        id,
        typeDocument,
        dateInvoicing,
        subtotalService,
        ivaService,
        description,
        typeService,
        unitBusiness
    }

    const fetchData = async () => {
        try {
          const data = await addService(token,service);
          setAlert(data)
        } catch (error) {
          setBad(error)
        }
      };
      fetchData();

}

if (alert && alert.message) {
  Swal.fire({
      icon: "success",
      title: "Servicio agregado correctamente",
      showConfirmButton: false,
      timer: 1500
    });
}

  return (
    <div className="bg-form-client">
        <form className="p-5 form-client" onSubmit={handleSubmit}>
        <h2 className="text-center mb-5">Agregar servicio</h2>
    {client && client.clients && (
        <div className="mb-3">
        <select
                  className="form-select"
                  value={idd}
                  onChange={(e) => setIdd(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value={"default"} >Seleccionar cliente</option>
                  {client.clients.map((clients) => (
                    <option key={clients.id} value={clients.id}>
                      {clients.nameClient}
                    </option>
                  ))}
                </select>
      </div>
    )}
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Tipo de documento</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={typeDocument} onChange={(e) => setTypeDocument(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Fecha de liquidación</label>
    <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={dateInvoicing} onChange={(e) => setDateInvoicing(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Subtotal facturado</label>
    <input type="number" step={0.01} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={subtotalServicee} onChange={(e) => setSubtotalServicee(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">IVA facturado</label>
    <input type="number" step={0.01} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ivaServicee} onChange={(e) => setIvaServicee(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Descripción</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={description} onChange={(e) => setDescription(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Tipo de servicio</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={typeService} onChange={(e) => setTypeService(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Unidad de negocio</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={unitBusiness} onChange={(e) => setUnitBusiness(e.target.value)} required/>
  </div>
  <div className="d-flex justify-content-center mb-3">
  <button type="submit" className="btn btn-success">Guardar</button>
  </div>
    {bad.response && Object.values(bad.response.data.message).map((alert, index) => (
      <div key={index} className="alert alert-warning">{alert}</div>
    ))}
</form>
    </div>
  )
}

export default FormService