import FormLogin from "../components/FormLogin"
import '../assets/styles/login.css'

function Login() {
  return (
    <main className="bg-login">
        <div className="container row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center">
            <FormLogin/>
            </div>
        </div>
    </main>
  )
}

export default Login