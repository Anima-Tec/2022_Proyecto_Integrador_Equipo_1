import React from 'react'
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

const MobileErrorView = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-firstBg text-center text-white">
      <ExclamationTriangleIcon className="w-24 text-firstColor" />
      <h1 className="text-xl font-bold text-white my-4">
        Página no disponible
      </h1>
      <p className="text-sm font-normal text-grayColor px-4">
        Esta página no está disponible en dispositivos móviles, por favor acceda
        desde una computadora
      </p>
    </div>
  )
}

export default MobileErrorView
