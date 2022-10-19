import React, { useState } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import { Formik, Field, Form } from "formik"
import { ChevronDownIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { AddCareerValidation } from "../utils/data"
import { preventEnterSubmit } from "../utils/functions"

const AddCareer = ({ onClick }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [repeatedKeyWord, setRepeatedKeyWord] = useState(false)
  const [keywords, setKeyWords] = useState([])
  const [keyword, setKeyword] = useState("")
  const [showSelect, setShowSelect] = useState(false)

  const addKeyword = () => {
    if (keyword !== "") {
      setKeyWords(() => {
        if (keywords.includes(keyword)) {
          setRepeatedKeyWord(true)
          return [...keywords]
        }
        setRepeatedKeyWord(false)
        return [...keywords, keyword]
      })
    }
  }

  const handleSubmit = (formValues) => {
    const carreerFormKeywords = { ...formValues, keywords: keywords }
    onClick(carreerFormKeywords)
  }

  Modal.setAppElement("#root")
  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addKeyword()
      setKeyword("")
      preventEnterSubmit(event)
    }
  }

  return (
    <div className="flex items-center mr-8">
      <PlusIcon className="w-8 text-white cursor-pointer" onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Career modal"
        className="modal min-h-sm"
        overlayClassName="modalOverlay"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="w-90% h-full flex flex-col mx-auto text-white">
          <Formik
            initialValues={{
              careerName: "",
              degree: "",
              careerDescription: "",
              keyword: "",
              duration: "",
            }}
            validationSchema={AddCareerValidation}
            onSubmit={(values, actions) => {
              handleSubmit(values)
              actions.resetForm()
              setRepeatedKeyWord(undefined)
              setKeyWords([])
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-full h-full">
                <div className="h-1/5 w-full flex">
                  <h1 className="text-white text-3xl my-auto">
                    Añadir carrera
                  </h1>
                </div>
                <div className="w-full h-3/5  grid grid-cols-2 items-center">
                  <div className="w-4/5 flex flex-col">
                    <label
                      className="text-base font-normal mb-2"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <Field
                      className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                      name="careerName"
                      placeholder="Agregar nombre de la carrera"
                    />
                    {touched.careerName && errors.careerName && (
                      <div className="relative">
                        <p className="errorMessage absolute">
                          {errors.careerName}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-4/5 flex flex-col">
                    <label
                      className="text-base font-normal mb-2"
                      htmlFor="title"
                    >
                      Título
                    </label>
                    <Field
                      className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                      name="degree"
                      placeholder="Agregar título de la carrera"
                    />
                    {touched.degree && errors.degree && (
                      <div className="relative">
                        <p className="errorMessage absolute">{errors.degree}</p>
                      </div>
                    )}
                  </div>
                  <div className="w-4/5 flex flex-col">
                    <label
                      className="text-base font-normal mb-2"
                      htmlFor="description"
                    >
                      Descripción
                    </label>
                    <Field
                      className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                      name="careerDescription"
                      placeholder="Agregar descripción"
                    />
                    {touched.careerDescription && errors.careerDescription && (
                      <div className="relative">
                        <p className="errorMessage absolute">
                          {errors.careerDescription}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-4/5 flex flex-col">
                    <label
                      className="text-base font-normal mb-2"
                      htmlFor="keywords"
                    >
                      Palabra clave
                    </label>
                    <div className="dropdown flex w-full h-11 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between">
                      <Field
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full h-full pl-4 bg-secondBg"
                        name="keyword"
                        placeholder="Agregar palabra clave"
                        onKeyPress={handleKeyPress}
                      />
                      {keywords.length > 0 && (
                        <ChevronDownIcon
                          className="w-8 text-firstColor"
                          onClick={() => setShowSelect(!showSelect)}
                        />
                      )}
                      <PlusIcon
                        className="w-6 text-firstColor cursor-pointer mr-2"
                        onClick={addKeyword}
                      />
                      {showSelect && (
                        <div className="w-full bg-blackOpacity z-10 dropdown-content">
                          {keywords.map((elem) => (
                            <div
                              className="flex justify-between hoverBg"
                              key={elem}
                            >
                              <p className="py-1 pl-2" key={elem}>
                                {elem}
                              </p>
                              <MinusIcon
                                className="cursor-pointer w-6 mr-2"
                                strokeWidth="2"
                                onClick={() =>
                                  setKeyWords(
                                    keywords.filter((item) => item !== elem)
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {repeatedKeyWord && (
                      <div className="relative">
                        <p className="errorMessage absolute">
                          Palabra repetida
                        </p>
                      </div>
                    )}
                    {keywords.length > 0 && repeatedKeyWord === false ? (
                      <div className="relative text-gray-400">
                        <p className="absolute">palabra agregada</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-4/5 flex flex-col">
                    <label
                      className="text-base font-normal mb-2"
                      htmlFor="duration"
                    >
                      Duracion
                    </label>
                    <Field
                      className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                      name="duration"
                      placeholder="Agregar duracion"
                    />
                    {touched.duration && errors.duration && (
                      <div className="relative">
                        <p className="errorMessage absolute">
                          {errors.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-1/5 w-full flex items-center justify-around">
                  <button
                    className="error-small-button text-white cursor-pointer"
                    onClick={closeModal}
                  >
                    Salir
                  </button>
                  <button
                    className="normal-small-button text-white cursor-pointer"
                    type="submit"
                  >
                    Confirmar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  )
}

export default AddCareer

AddCareer.propTypes = {
  onSubmit: PropTypes.func,
}
