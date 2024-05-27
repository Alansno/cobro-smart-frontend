import { useEffect, useState } from 'react'
import '../assets/styles/clientsService.css'
import { getServices } from '../service/services'
import useAuthProvider from '../store/AuthProvider'

function AllServices() {

    const [account, setAccount] = useState("")
    const [pay, setPay] = useState("")
    const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const {token} = useAuthProvider()
  const [fecha, setFecha] = useState('');
  const [services, setServices] = useState({})

  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await getServices(token);
          console.log(data)
          setServices(data)
        } catch (error) {
            console.log(error)
        }
      };
      fetchData();
  }, [token])

  // Función para formatear la fecha en el formato deseado
  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toISOString().slice(0, 19).replace('T', ' ');
  };

  // Búsqueda en todos los datos
  const servicesData = services?.message || []; // Acceder a la propiedad 'clientes' dentro de 'data' si existe

  // Búsqueda en todos los datos
  const filteredData = servicesData.filter(item =>
    item.typeService.toLowerCase().includes(search.toLowerCase()) ||
    item.dateInvoicing.toLowerCase().includes(search.toLowerCase()) ||
    item.client.nameClient.toLowerCase().includes(search.toLowerCase()) ||  // Asegúrate de convertir total a cadena antes de comparar
    item.status.toLowerCase().includes(search.toLowerCase())
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

    

  return (
    <main className='bg-clients-service'>
        <div className='clients-tittle'>
              <h1 className='text-center fw-bold'>Servicios</h1>
      </div>

      <div className='container'>
      <div className='d-flex gap-3 mt-5'>

        <input className='input-clients' placeholder='buscar' type="text" name="" id="" value={search}
            onChange={(e) => handleSearch(e.target.value)}/>
      </div>

      <div className='mt-5'>
      <div className="table-responsive">
     <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Fecha</th>
      <th scope="col">Tipo de servicio</th>
      <th scope="col">Estatus</th>
      <th scope="col">Cliente</th>
    </tr>
  </thead>
  <tbody className="table-group-divider">
    
      {paginatedData && (
        <>
        {paginatedData.map((item) => (
          <>
          <tr key={item.id}>
          <td >{item.id}</td>
          <td>{item.dateInvoicing}</td>
          <td>{item.typeService}</td>
          <td>{item.status}</td>
          <td>{item.client.nameClient}</td>
          </tr>
          </>
        ))}
        </>
      )}
  </tbody>
</table>
     </div>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <div>
        <p>Página {currentPage} de {totalPages}</p>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </button>
        </div>
      </div>
      </div>
    </main>
  )
}

export default AllServices