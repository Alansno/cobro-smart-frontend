import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import FormAccount from "../components/FormAccount"
import Navbar from "../components/Navbar"

function AddAccount() {
  return (
    <main className="bg-home">
        <Navbar/>
        <DashOptions/>
        <FormAccount/>
    </main>
  )
}

export default AddAccount