import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import FormRecord from "../components/FormRecord"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"

function AddRecord() {

    const {idService} = useParams()

  return (
    <main className="bg-home">
        <Navbar/>
        <DashOptions/>
        <FormRecord idService={idService}/>
    </main>
  )
}

export default AddRecord