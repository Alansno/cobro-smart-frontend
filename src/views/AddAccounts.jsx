import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import FormAccounts from "../components/FormAccounts"
import Navbar from "../components/Navbar"

function AddAccounts() {
  return (
    <main className="bg-home">
        <Navbar/>
        <DashOptions/>
        <FormAccounts/>
    </main>
  )
}

export default AddAccounts