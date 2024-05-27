import '../assets/styles/home.css'
import ClientsList from '../components/ClientsList'
import DashOptions from '../components/DashOptions'
import Navbar from '../components/Navbar'

function Clients() {
  return (
    <main className='bg-home'>
        <Navbar/>
        <DashOptions/>
        <ClientsList/>
    </main>
  )
}

export default Clients