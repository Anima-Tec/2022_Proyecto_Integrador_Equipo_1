import React, { useState, useEffect } from "react"
import SearchButton from "../components/searchButton"
import { getCentresName, requestCentre } from "../api/api"
import Modal from "react-modal"
import { InformationCircleIcon } from "@heroicons/react/outline"

const DeleteCentre = () => {
  const [centresValues, setCentresValues] = useState([])
  const [centre, setCentre] = useState([])
  const [confirmMenu, setConfirmMenu] = useState(false)
  const [missingCentre, setMissingCentre] = useState(false) 

  useEffect(() => {
    getCentresName().then((response) => {
      setCentresValues(response)
    })
  }, [])

  const handleSearch = (searchValue) => {
    const matchCentre = centresValues.findIndex(item => {return item.centreName === searchValue})
    setCentre(centresValues[matchCentre])
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (centre) {
      setMissingCentre(false)
      openModal()
    } else {
      setMissingCentre(true)
    }
  }

  const deleteCentre = () => {
    requestCentre( `centres/centre?id=${centre.idCentre}`,
    "DELETE")
    closeModal()
  }

  Modal.setAppElement("#root")

  function openModal() {
    setConfirmMenu(true)
  }

  function closeModal() {
    setConfirmMenu(false)
  }

  return (
    <div className="w-85% h-full bg-firstBg">
      <form className="w-95% h-full ml-auto">
        <div className="w-full">
          <h1 className="text-4xl py-12">Eliminar Centro</h1>
        </div>
        <div className="w-90% h-3/5 ">
          <h5 className="text-xl mb-2">Nombre del centro a eliminar </h5>
          <SearchButton
            centresName={centresValues.map(item => item.centreName)}
            placeholder="Ingrese nombre del centro a editar"
            className={
              "dropdown flex w-96 h-11 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between"
            }
            searchValue={handleSearch}
          ></SearchButton>
        </div>
        <div className="w-full h-1/5 flex flex-col items-end">
          {missingCentre && (
            <p className="errorMessage mr-52">
              Ingrese un centro para eliminar
            </p>
          )}
          <button
            className="text-white error-normal-button cursor-pointer mr-24"
            onClick={handleClick}
          >
            Confirmar
          </button>
          <Modal
            isOpen={confirmMenu}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modalOverlay"
          >
            <div className="flex flex-col items-center text-white w-full h-full">
              <InformationCircleIcon className="w-32 text-alertColor mt-6" />
              <div className="text-center mt-12">
                <h1 className="text-3xl font-normal">
                  ¿Seguro que desea eliminar este centro?
                </h1>
                <p className="text-xl font-light text-gray-400 mt-2">
                  Esto es irreversible
                </p>
              </div>
              <div className="mt-auto mb-12 flex justify-around w-full">
                <button
                  className="error-small-button cursor-pointer"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  className="normal-small-button cursor-pointer"
                  onClick={deleteCentre}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </form>
    </div>
  )
}

export default DeleteCentre
