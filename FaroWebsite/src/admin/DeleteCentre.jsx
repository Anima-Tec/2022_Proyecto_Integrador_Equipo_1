import React, { useState, useEffect } from "react"
import SearchButton from "../components/searchButton"
import Modal from "react-modal"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import CentreController from "../networking/controllers/Centre-Controller"
import CustomToast from "../components/CustomToast"

const DeleteCentre = () => {
  const [centresNames, setCentresNames] = useState([])
  const [centreName, setCentreName] = useState([])
  const [confirmMenu, setConfirmMenu] = useState(false)
  const [missingCentre, setMissingCentre] = useState(false)
  const [centreDeleted, setCentreDeleted] = useState(false)
  const [showToast, setShowToast] = useState(null)

  useEffect(() => {
    async function fetchCentres() {
      const centres = await CentreController.getCentres()
      setCentresNames(centres)
    }
    fetchCentres()
  }, [centreDeleted])

  const handleSearch = (searchValue) => {
    const centres = centresNames.map((centre) => centre.centreName)
    setCentreName(centresNames[centres.indexOf(searchValue)])
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (centreName) {
      setMissingCentre(false)
      openModal()
    } else {
      setMissingCentre(true)
    }
  }

  const deleteCentre = () => {
    try {
      CentreController.deleteCentre(centreName.idCentre)
      setCentreDeleted(true)
      setShowToast(true)
    }
    catch (e) {
      setShowToast(false)
      setCentreDeleted(false)
    }
    closeModal()
    setCentreDeleted(true)
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
       <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={
          centreDeleted
            ? "centro eliminado"
            : "Hubo un problema, intente nuevamente"
        }
        state={centreDeleted}
      />
      <form className="w-95% h-full ml-auto">
        <div className="w-full">
          <h1 className="text-4xl py-12">Eliminar Centro</h1>
        </div>
        <div className="w-90% h-3/5 ">
          <h5 className="text-xl mb-2">Nombre del centro a eliminar </h5>
          <SearchButton
            placeholder="Ingrese nombre del centro a editar"
            centresName={centresNames.map((centre) => centre.centreName)}
            className={
              "dropdown flex w-96 h-11 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between"
            }
            searchValue={handleSearch}
            clearValue={centreDeleted}
          ></SearchButton>
        </div>
        <div className="w-full h-1/5 flex flex-col items-end smMinH:h-0">
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
