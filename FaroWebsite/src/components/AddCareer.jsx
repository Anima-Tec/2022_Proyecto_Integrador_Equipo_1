import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { Formik, Field, Form } from 'formik'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { AddCareerValidation } from '../utils/data'

const AddCareer = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [repeatedKeyWord, setRepeatedKeyWord] = useState(false)
  const [keywords, setKeyWords] = useState([])
  const [showSelect, setShowSelect] = useState(false)
  const inputRef = useRef(null)

  // useEffect(() =>{
  //   if(props.careers){
  //     Formik.values(props.careers)
  //   }
  // },[props.careers])

  const addKeyword = () => {
    const keyword = inputRef.current.value

    setKeyWords(() => {
      if (keywords.includes(keyword)) {
        setRepeatedKeyWord(true)
        return [...keywords]
      }
      setRepeatedKeyWord(false)
      return [...keywords, keyword]
    })
  }

  const handleSubmit = (formValues) => {
    const carreerFormKeywords = { ...formValues, keyword: keywords }
    props.onSubmit(carreerFormKeywords)
  }

  Modal.setAppElement('#root')
  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <div className="flex items-center mr-8">
      <PlusIcon className="w-8 text-white cursor-pointer" onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modalOverlay"
      >
        <div className="w-90% h-full flex flex-col mx-auto text-white">
          <Formik
            initialValues={{
              careerName: '',
              careerTitle: '',
              careerDescription: '',
              keyword: '',
              careerDuration: ''
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
                <h1 className="text-white text-3xl my-auto">Añadir carrera</h1>
              </div>
              <div className="w-full h-3/5  grid grid-cols-2 items-center">
                <div className="w-4/5 flex flex-col">
                  <label className="text-base font-normal mb-2" htmlFor="name">
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
                  <label className="text-base font-normal mb-2" htmlFor="title">
                    Título
                  </label>
                  <Field
                    className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                    name="careerTitle"
                    placeholder="Agregar título de la carrera"
                    
                  />
                  {touched.careerTitle && errors.careerTitle && (
                    <div className="relative">
                      <p className="errorMessage absolute">
                        {errors.careerTitle}
                      </p>
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
                      innerRef={inputRef}
                      className="w-full h-full pl-4 bg-secondBg"
                      name="keyword"
                      placeholder="Agregar palabra clave"
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
                    <p className="errorMessage">Palabra repetida</p>
                  )}
                  {keywords.length > 0 && repeatedKeyWord === false ? (
                    <div className="relative text-gray-400">
                      <p className="absolute">palabra agregada</p>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="w-4/5 flex flex-col">
                  <label
                    className="text-base font-normal mb-2"
                    htmlFor="careerDuration"
                  >
                    Duracion
                  </label>
                  <Field
                    className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                    name="careerDuration"
                    placeholder="Agregar duracion"
                  />
                  {touched.careerDuration && errors.careerDuration && (
                    <div className="relative">
                      <p className="errorMessage absolute">
                        {errors.careerDuration}
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
  onSubmit: PropTypes.func
}
