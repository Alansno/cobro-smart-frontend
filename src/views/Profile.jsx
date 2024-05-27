import DashOptions from "../components/DashOptions"
import '../assets/styles/home.css'
import ProfileComponent from "../components/ProfileComponent"
import Navbar from "../components/Navbar"

function Profile() {
  return (
    <main className="bg-home">
        <Navbar/>
        <DashOptions/>
        <ProfileComponent/>
    </main>
  )
}

export default Profile