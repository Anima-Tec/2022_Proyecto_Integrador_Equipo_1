import React, { useEffect, useState } from "react"
import farologo from "../assets/images/Farologo.png"
import { isMobile } from "../utils/functions"
import MobileErrorView from "../utils/mobileErrorView"
import { useNavigate } from "react-router-dom"
import AdminController from "../networking/controllers/Admin-Controller"
import CustomToast from "../components/CustomToast"

const AdminLogIn = () => {
  const [validationState, setValidationState] = useState(null)
  const [showToast, setShowToast] = useState(null)

  let navigate = useNavigate()

  const handleLogIn = async ({ user, password }) => {
    AdminController.handleLogin(user, password).then((res) => {
      setValidationState(true)
      setShowToast(true)
      localStorage.setItem("token", res)
    }).catch((err) => {
     setValidationState(false)
     setShowToast(true)
    })
    }
  
  useEffect(() => {
    if (validationState) {
      localStorage.setItem("islogged", true)
      setTimeout(() => {
        navigate("/database-filler")
      },1000)
    } else {
      localStorage.setItem("islogged", false)
    }
  }, [validationState])

  const handleSubmitLogIn = (event) => {
    event.preventDefault()
    const [username, password] = document.forms[0]
    handleLogIn({
      user: username.value,
      password: password.value,
    })
  }

  if (isMobile()) {
    return <MobileErrorView />
  } else {
    return (
      <div className="flex h-screen min-h-md overflow-y-scroll">
      <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={
           validationState
            ? "Iniciando sesión..."
            : "Usuario o contraseña invalido"
        }
        state={validationState}
      />
        <div className="w-1/2 h-full flex justify-center items-center bg-secondBg">
          <div className="flex items-end">
            <img className="w-24 mr-4" src={farologo} alt="Faro logo" />
            <h1 className="tracking-widest text-white text-5xl font-extrabold">
              Faro
            </h1>
          </div>
        </div>
        <div className="w-1/2 h-full bg-firstBg flex flex-col items-center">
          <h1 className="tracking-widest text-white text-5xl font-regular mt-16">
            Iniciar Sesión
          </h1>
          <form action="submit">
            <div className="my-24">
              <p className="text-2xl text-white mb-6">Usuario</p>
              <input
                className="pl-4 w-128 h-12 bg-secondBg rounded-md border-2 border-firstColor text-white"
                placeholder="Ingrese su usuario"
                type="text"
              />
            </div>
            <div>
              <p className="text-2xl text-white mb-6">Contraseña</p>
              <input
                className="pl-4 w-128 h-12 bg-secondBg rounded-md border-2 border-firstColor text-white"
                placeholder="Ingrese la contraseña"
                type="password"
              />
              {validationState === false && (
                <p className="errorMessage absolute">Usuario o contraseña incorrectos</p>
              )}
            </div>
            <div className="flex justify-center mt-48 smMinH:mt-24">
              <input
                className="text-white cursor-pointer normal-button"
                onClick={handleSubmitLogIn}
                type="submit"
                value="Iniciar Sesión"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AdminLogIn
