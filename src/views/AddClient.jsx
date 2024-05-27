import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import FormClient from "../components/FormClient"
import Navbar from "../components/Navbar"

function AddClient() {
  return (
    <main className="bg-home">
        <Navbar/>
        <DashOptions/>
        <FormClient/>
    </main>
  )
}

export default AddClient