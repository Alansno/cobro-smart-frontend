import { useEffect, useState } from 'react'
import '../assets/styles/clientsService.css'
import TableRecords from './TableRecords';
import useAuthProvider from '../store/AuthProvider';
import { Link } from "react-router-dom";

function InputClient({client}) {
  const [selectedValue, setSelectedValue] = useState("");
  const {token} = useAuthProvider()
  let id

  useEffect(() => {
    
  }, [client])

  let clientService = client?.message[0].services

  const data = clientService?.filter( services => services.typeService === selectedValue)


  if (client && client.error) {
    return (
      <div className="alert alert-danger">
        {client.error}
      </div>
    );
  }

  if (data && data[0]) {
    id = data[0].id
  }

  return (
    <div>
      <div className='row mt-3'>
      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
      <div className="client-label mb-3">
        <p>Datos del cliente</p>
      </div>

        
          <div className='label-content mb-3'>
            <p><small>Correo electrónico: </small>{client.message[0].emailClient}</p>
          </div>
          <div className='label-content mb-3'>
            <p><small>Fecha de ingreso: </small> {client.message[0].createdAt}</p>
          </div>
          <div className='label-content mb-3'>
            <p><small>Dirección: </small> {client.message[0].addressClient} </p>
          </div>
          <div className='label-content'>
            <p><small>Teléfono: </small> {client.message[0].phoneClient}</p>
          </div>
      </div>

      <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
      {!client.message[0].services ? (
        <div className='label-content mt-5'><p className='text-nothing'>Este cliente aún no tiene un servicio, haz click <Link to={"/agregar-servicio"}>AQUÍ</Link> para agregar uno</p></div>
      ) : 
      (
        <div className='mt-3'>
          <div className='d-flex gap-3'>
            <div className="client-label mb-3"><p>Datos del servicio</p></div>
            <select
              className="form-select select-label"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              aria-label="Default select example"
            >
              <option value={"default"} >Servicio</option>
              {client.message[0].services.map((service, index) => (
                <option key={index} value={service.typeService}>
                  {service.typeService}
                </option>
              ))}
            </select>
          </div>

          {data && data[0] ? (
            <>
            <div className='label-content mb-3'><p><small>Total facturado: </small> {data[0].totalService}</p></div>
            <div className='label-content mb-3'><p><small>Diferencia: </small> {data[0].difference}</p></div>
            <div className='d-flex gap-3'>
            {data[0].status === "Sin pago" ?(
              <div className='input-status bg-danger'><p>{data[0].status}</p></div>
            ) : (
              <div className='input-status'><p>{data[0].status}</p></div>
            )}
            <button className='btn-registro'><Link to={`/agregar-registro/${data[0].id}`}>Agregar registro</Link></button>
          </div>
            </>
            ) : (
              <>
              <div className='label-content mb-3'><p><small>Total facturado: </small> </p></div>
            <div className='label-content mb-3'><p><small>Fecha de facturación: </small> </p></div>
            <div className='d-flex gap-3'>
          </div>
              </>
            )
            
            }
        </div>
      )
      }
      </div>
    </div>

    <TableRecords id={id} token={token}/>
    </div>
  );
}

export default InputClient