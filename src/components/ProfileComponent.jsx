import { useEffect, useState } from 'react'
import '../assets/styles/profile.css'
import useAuthProvider from "../store/AuthProvider"
import { getProfile } from '../service/user'

function ProfileComponent() {
  const {token,user} = useAuthProvider()
  const [userData, setUserData] = useState({})
  const [bad, setBad] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile(token);
        console.log(data)
        setUserData(data)
      } catch (error) {
        console.log(error)
        setBad(error)
      }
    };
    fetchData();
  }, [token])

  return (
    <div className="bg-profile mt-5">
      <div className='ctn-profile'>
      <div className='text-center'>
        <h2>Perfil de usuario</h2>
      </div>

      {userData && userData.companyData && (
        <div className='row mt-5'>
        <div className='col'>
        <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.companyData.emailCompany} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.companyData.nameCompany} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.companyData.addressCompany} required readOnly/>
  </div>
        </div>

        <div className='col'>
        <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.username} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.companyData.typeIndustry} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.companyData.phoneCompany} required readOnly/>
  </div>
        </div>
      </div>
      )} 
      {userData && userData.userData && (
        <div className='row mt-5'>
        <div className='col'>
        <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.userData.emailUser} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.username} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.userData.phoneUser} required readOnly/>
  </div>
        </div>

        <div className='col'>
        <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.userData.nameUser} required readOnly/>
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData.userData.company.nameCompany} required readOnly/>
  </div>
        </div>
      </div>
      )}     
      </div>
    </div>
  )
}

export default ProfileComponent