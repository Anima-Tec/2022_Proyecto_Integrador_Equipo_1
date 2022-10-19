import React, { useState } from 'react'
import CreateCentre from '../admin/CreateCentre'
import EditCentre from '../admin/EditCentre'
import DeleteCentre from '../admin/DeleteCentre'
import farologo from '../assets/images/Farologo.png'

const DatabaseFiller = () => {
  const [centreFocus, setCentreFocus] = useState(1)

  const changeSection = () => {
    if (centreFocus === 1) {
      return <CreateCentre />
    }
    if (centreFocus === 2) {
      return <EditCentre/>
    }
    if (centreFocus === 3) {
      return <DeleteCentre/>
    }
  }

  return (
    <div className="w-screen h-screen text-white flex min-h-md">
      <div className="w-25% h-full bg-secondBg flex flex-col">
        <div className="flex mx-auto mt-4">
          <img className="w-24" src={farologo} alt="Faro logo" />
          <h1 className="tracking-widest text-5xl font-extrabold mt-auto">
            Faro
          </h1>
        </div>
        <div className="w-full h-1px bg-white my-4"></div>
        <div>
          <h3 className='text-2xl text-center mb-8'>Gestionar centros</h3>
          <div className={`w-full py-2 ${centreFocus === 1 ? 'active' : 'inactive'}`}>
            <button className='text-xl ml-6' onClick={() => {setCentreFocus(1)}}>Crear centro</button>
          </div>
          <div className={`w-full py-2 ${centreFocus === 2 ? 'active' : 'inactive'}`}>
            <button className='text-xl ml-6' onClick={() => {setCentreFocus(2)}}>Editar centro</button>
          </div>
          <div className={`w-full py-2 ${centreFocus === 3 ? 'active' : 'inactive'}`}>
            <button className='text-xl ml-6' onClick={() => {setCentreFocus(3)}}>Eliminar centro</button>
          </div>
        </div>
      </div>
      {changeSection()}
    </div>
  )
}

export default DatabaseFiller
