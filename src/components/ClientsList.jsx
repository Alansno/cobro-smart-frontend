import '../assets/styles/clients.css'
import icon from '../assets/img/chevron-right.svg'
import left from '../assets/img/chevron-left.svg'
import { useState } from 'react'
import OptionsClients from './OptionsClients';
import { useClients } from '../service/clients';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import useAuthProvider from '../store/AuthProvider';

function ClientsList() {
  const { data, isError, error } = useClients();
  const {user} = useAuthProvider()
  
  useEffect(() => {
    data
  }, [data]);

    const [showComponent,setShowComponent] = useState({});
    const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Búsqueda en todos los datos
  const clientsData = data?.clients || []; // Acceder a la propiedad 'clientes' dentro de 'data' si existe

  // Búsqueda en todos los datos
  const filteredData = clientsData.filter(item =>
    item.nameClient.toLowerCase().includes(search.toLowerCase())
  );

  // Reiniciar la página al realizar una búsqueda
  const handleSearch = (term) => {
    setSearch(term);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    const showOrHiddenComponent = (itemId) => {
        setShowComponent((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
          }));
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
      }


  return (
    <div className="bg-clients">
        <div className="search">
            <h4>Catalogo de clientes</h4>
            <input className='input-clients' placeholder='buscar' type="text" name="" id="" value={search}
            onChange={(e) => handleSearch(e.target.value)}/>
        </div>

        <div className='mt-5'>
        {paginatedData.map((item) => (
            <div key={item.id} className="card mb-3 card-bg">
            <div className="card-body d-flex justify-content-between align-items-center">
                <p className='text-client'>{item.nameClient}</p>
                <div className='d-flex gap-3'>
                    <p className='fs-3 points' onClick={() => showOrHiddenComponent(item.id)}>...</p>
                    <Link to={`/cliente-servicio/${item.id}`}><img className='arrow-client' src={icon} alt="" /></Link>
                    {showComponent[item.id] && <OptionsClients id={item.id}/>}
                </div>
            </div>
            </div>
          ))}
        <div className='d-flex gap-3 justify-content-center'>
          <button style={{border: 'none', backgroundColor: 'white'}} className='' alt="" disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}><img style={{cursor: 'pointer'}} src={left}/></button>
        
  
          <p className='mt-3'>Página {currentPage} de {totalPages}</p>
          <button style={{border: 'none', backgroundColor: 'white'}} className='' alt="" disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}><img style={{cursor: 'pointer'}} src={icon}/></button>
          
        </div>
        </div>
    </div>
  )
}

export default ClientsList