import React, { useState, useEffect } from "react"
import AddCarrer from "../components/AddCareer"
import { useFormik } from "formik"
import {
  freeOptions,
  schoolarLevelOptions,
  centreScheduleOptions,
} from "../utils/data"
import CustomSelect from "../components/CustomSelect"
import CustomMultiSelect from "../components/CustomMultiSelect"
import { centreValidation } from "../utils/data"
import { parseCentreFormValues } from "../utils/functions"
import { ChevronDownIcon, MinusIcon } from "@heroicons/react/24/outline"
import CentreController from "../networking/controllers/Centre-Controller"
import CustomToast from "../components/CustomToast"
import { useNavigate } from "react-router-dom"

const CreateCentre = () => {
  const [careers, setCareers] = useState([])
  const [showCareers, setShowCareers] = useState(false)
  const [addressState, setAddressState] = useState(false)
  const [centreAdded, setCentreAdded] = useState(false)
  const [showToast, setShowToast] = useState(null)
  let navigate = useNavigate()

  useEffect(() => {
    formik.setFieldValue("careers", careers)
  }, [careers])

  const formik = useFormik({
    initialValues: {
      centreName: "",
      addressStreet: "",
      addressNumber: "",
      free: null,
      phoneNumber: "",
      schoolarLevel: "",
      centreSchedules: [],
      careers: {},
    },

    validationSchema: centreValidation(),

    onSubmit: async (values) => {
      const parsedValues = await parseCentreFormValues(values)
      if (parsedValues.latitude && parsedValues.longitude !== undefined) {
        setAddressState(false)
        CentreController.createCentre(parsedValues)
          .then((response) => {
            if (response === 200) {
              setCentreAdded(true)
              setShowToast(true)
              handleResetForm()
            }
          })
          .catch((err) => {
            if (err.status === 401) {
              navigate("/login")
            }
            setCentreAdded(false)
            setShowToast(true)
          })
      } else {
        setAddressState(true)
      }
      setCentreAdded(null)
      setShowToast(false)
    },
  })

  const getCareerData = (data) => {
    setCareers((item) => [...item, data])
  }

  const handleResetForm = () => {
    formik.resetForm()
    setCareers([])
  }

  return (
    <div className="w-85% h-full bg-firstBg">
      <CustomToast
        show={showToast}
        close={() => setShowToast(false)}
        notifi={
          centreAdded
            ? "centro añadido"
            : "Hubo un problema, intente nuevamente"
        }
        state={centreAdded}
      />
      <div className="w-95% h-full ml-auto">
        <form className="w-full h-full" onSubmit={formik.handleSubmit}>
          <div className="w-full h-1/5 flex items-center">
            <h1 className="text-4xl ">Crear centro</h1>
          </div>
          <div className="w-90% h-3/5  grid grid-cols-2 items-center">
            <div className="w-4/5 flex flex-col">
              <label
                className="text-base font-normal mb-2"
                htmlFor="centreName"
              >
                Nombre
              </label>
              <input
                className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                name="centreName"
                placeholder="Agregar nombre del centro"
                onChange={formik.handleChange}
                value={formik.values.centreName}
                type="text"
              />
              {formik.touched.centreName && formik.errors.centreName && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.centreName}
                  </p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex">
              <div className="w-full flex flex-col">
                <label className="text-base font-normal mb-2" htmlFor="address">
                  Direccion
                </label>
                <div className="w-full flex flex">
                  <div className="w-4/5 flex flex-col">
                    <input
                      className="w-full h-11 pl-4 bg-secondBg rounded-l-md border-2 border-firstColor"
                      name="addressStreet"
                      placeholder="Agregar dirección del centro"
                      onChange={formik.handleChange}
                      value={formik.values.addressStreet}
                      type="text"
                    />
                    {((formik.touched.addressStreet &&
                      formik.errors.addressStreet) ||
                      (formik.touched.addressNumber &&
                        formik.errors.addressNumber)) && !addressState &&(
                      <div className="relative">
                        <p className="errorMessage absolute">
                          La Direccion no es valida
                        </p>
                      </div>
                    )}
                    {addressState && (
                      <div className="relative">
                        <p className="errorMessage absolute">
                          Direccion incorrecta, inserte otra
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-auto flex flex-col">
                    <input
                      className="w-16 h-11 pl-2 bg-secondBg rounded-r-md border-2 border-firstColor"
                      name="addressNumber"
                      placeholder="Puerta"
                      onChange={formik.handleChange}
                      value={formik.values.addressNumber}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4/5 flex flex-col">
              <label className="text-base font-normal mb-2" htmlFor="free">
                Privado/Publico
              </label>
              <CustomSelect
                defaultValue={{ value: "Sin elegir", label: "sin elegir" }}
                name={"free"}
                options={freeOptions}
                value={formik.values.free}
                onChange={(value) => formik.setFieldValue("free", value.value)}
                placeholder={"Agregar el precio del centro"}
              />
              {formik.touched.free && formik.errors.free && (
                <div className="relative">
                  <p className="errorMessage absolute">{formik.errors.free}</p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex flex-col">
              <label
                className="text-base font-normal mb-2"
                htmlFor="phoneNumber"
              >
                Teléfono
              </label>
              <input
                className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                name="phoneNumber"
                placeholder="Agregar teléfono del centro"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                type="number"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.phoneNumber}
                  </p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex flex-col">
              <label
                className="text-base font-normal mb-2"
                htmlFor="schoolarLevel"
              >
                Grado
              </label>
              <CustomSelect
                defaultValue="no select"
                name={"schoolarLevel"}
                options={schoolarLevelOptions}
                value={formik.values.schoolarLevel}
                onChange={(value) =>
                  formik.setFieldValue("schoolarLevel", value.value)
                }
                placeholder={"Agregar el grado del centro"}
              />
              {formik.touched.schoolarLevel && formik.errors.schoolarLevel && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.schoolarLevel}
                  </p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex flex-col">
              <label
                className="text-base font-normal mb-2"
                htmlFor="centreSchedules"
              >
                Horarios
              </label>
              <CustomMultiSelect
                defaultValue="no select"
                name={"centreSchedules"}
                isMulti
                options={centreScheduleOptions}
                value={formik.values.centreSchedules}
                onChange={(value) =>
                  formik.setFieldValue("centreSchedules", value)
                }
                placeholder={"Agregar los horarios del centro"}
              />
              {formik.touched.centreSchedules && formik.errors.centreSchedules && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.centreSchedules}
                  </p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex flex-col">
              <h1 className="text-base font-normal">Carreras</h1>
              <div className="flex w-full h-11 mt-4 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between dropdown">
                <p className="text-placeHolderColor text-base my-auto pl-4">
                  Añadir carrera
                </p>
                <div className="flex items-center ml-auto">
                  {careers.length > 0 && (
                    <ChevronDownIcon
                      className="w-8 ml-auto"
                      onClick={() => setShowCareers(!showCareers)}
                    />
                  )}
                  <AddCarrer onClick={getCareerData} />
                </div>
                {showCareers && (
                  <div className="w-full bg-blackOpacity z-10 dropdown-content">
                    {careers.map(({ careerName }) => (
                      <div key={careerName} className="flex">
                        <p className="text-white">{careerName}</p>
                        <MinusIcon
                          onClick={() =>
                            setCareers(
                              careers.filter(
                                (career) => career.careerName !== careerName
                              )
                            )
                          }
                          className="w-8 ml-auto"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formik.touched.careers && formik.errors.careers && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.careers}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <button
              className={`text-white cursor-pointer ml-auto mr-24 ${
                !formik.isValid && formik.submitCount > 0
                  ? "error-normal-button"
                  : "normal-button "
              }`}
              type="submit"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCentre
