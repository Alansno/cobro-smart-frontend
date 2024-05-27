import '../assets/styles/clientsService.css'
import InputClient from '../components/InputClient'
import { useParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import useAuthProvider from '../store/AuthProvider';
import { getServicesClient } from '../service/services';

function ClientService() {

    const {id} = useParams()
    const {client, token, newClient} = useAuthProvider();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true)
          try {
            const data = await getServicesClient(id,token);
            newClient(data)
            setError(null);
          } catch (error) {
            setError(error);
          }
          setIsLoading(false)
        };
        fetchData();
      }, [id,token,newClient]);
    
      if (isLoading) {
        return (
          <div className='d-flex justify-content-center' style={{marginTop: '300px'}}>
            <span className="spinner-border"></span> Cargando...
          </div>
        );
      }
    
      if (error) {
        return (
          <section className="alert alert-danger">
            Error fetching posts: No se encontró ningun dato
          </section>
        );
      }

  return (
    <>
    {client && client.message &&(
      <main className='bg-clients-service'>
      <div className='clients-tittle'>
              <h1 className='text-center fw-bold'>{client.message[0].nameClient}</h1>
      </div>

      <div className='container'>
        <InputClient client={client}/>
      </div>
  </main>
    )}
    </>
  )
}

export default ClientService