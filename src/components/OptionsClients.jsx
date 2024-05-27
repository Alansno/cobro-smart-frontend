import update from '../assets/img/pencil.svg'
import trash from '../assets/img/trash3.svg'
import '../assets/styles/clients.css'
import Swal from 'sweetalert2'
import { deleteClient } from '../service/clients'
import useAuthProvider from '../store/AuthProvider'

function OptionsClients({id}) {

  const {token,user} = useAuthProvider()

  const handleDelete = () => {
    Swal.fire({
      title: "¿Deseas eliminar este cliente?",
      text: "Ten en cuenta que no se borrará por completo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
          try {
            const data = await deleteClient(id, token);
            // Mover la lógica de la segunda alerta aquí
            if (data && data.mensaje) {
              Swal.fire({
                title: "Eliminado",
                text: "El cliente se ha eliminado correctamente",
                icon: "success"
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }
    });
  };
  

  return (
    <div className='mini-options'>
      {user && user.role === 'Admin' ?(
        <>
        <img src={update} alt="" />
        <img style={{cursor: 'pointer'}} src={trash} onClick={handleDelete} alt="" />
        </>
      ) : (
        <div>No :C</div>
      )
      
      }
        
    </div>
  )
}

export default OptionsClients