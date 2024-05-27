import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import FormService from "../components/FormService"
import Navbar from "../components/Navbar"

function AddService() {
  return (
    <main className="bg-home">
        <Navbar/>
        <DashOptions/>
        <FormService/>
    </main>
  )
}

export default AddService