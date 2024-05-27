import { useState, useEffect } from 'react';
import '../assets/styles/clientsService.css';
import TableRecords from './TableRecords';

function InputService({ client }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [id, setId] = useState()

  useEffect(() => {
  }, [client]);

  const data = client?.servicios?.filter( services => services.type_service === selectedValue)
  

  return (
    <>
      {!client.servicios ? (
        <div>No hay servicios, agrega uno</div>
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
              {client.servicios.map((service, index) => (
                <option key={index} value={service.type_service}>
                  {service.type_service}
                </option>
              ))}
            </select>
          </div>

          {data && data[0] ? (
            <>
            <div className='label-content mb-3'><p><small>Total facturado: </small> {data[0].total}</p></div>
            <div className='label-content mb-3'><p><small>Fecha de facturación: </small> {data[0].date}</p></div>
            <div className='d-flex gap-3'>
            {data[0].status === "Sin pago" ?(
              <div className='input-status bg-danger'><p>{data[0].status}</p></div>
            ) : (
              <div className='input-status'><p>{data[0].status}</p></div>
            )}
            <button type="button" className="btn btn-info text-white">
              Agregar registro
            </button>
          </div>
            </>
            ) : (
              <>
              <div className='label-content mb-3'><p><small>Total facturado: </small> </p></div>
            <div className='label-content mb-3'><p><small>Fecha de facturación: </small> </p></div>
            <div className='d-flex gap-3'>
            <button type="button" className="btn btn-info text-white">
              Agregar registro
            </button>
          </div>
              </>
            )
            
            }
        </div>
      )
      }
    </>
    
  );
}

export default InputService;
