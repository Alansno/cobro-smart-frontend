import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import logo from '../assets/img/Logo.png';
import Navbar from "../components/Navbar";

function Home() {
  return (
    <main className="bg-home">
      <Navbar/>
      <DashOptions/>
      <img className="background-logo" src={logo} alt="" />
    </main>
  )
}

export default Home