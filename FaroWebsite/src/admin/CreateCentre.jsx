import React, { useState } from "react";
import AddCarrer from "../components/AddCareer";
import { useFormik } from "formik";
import {
  freeOptions,
  schoolarLevelOptions,
  centreScheduleOptions,
} from "../utils/data";
import CustomSelect from "../components/CustomSelect";
import CustomMultiSelect from "../components/CustomMultiSelect";
import { centreValidation } from "../utils/data";
import { sendCreatedCentre } from "../api/api";
import { parseCentreFormValues } from "../utils/functions";

const CreateCentre = () => {
  const [careers, setCareers] = useState([]);

  const formik = useFormik({
    initialValues: {
      centreName: "",
      centreAddress: "",
      centreStreet: "",
      free: null,
      centrePhone: "",
      schoolarLevel: [],
      centreSchedule: [],
      careers: {},
      pagelink: "",
    },

    validationSchema: centreValidation(),

    onSubmit: (values) => {
      const parsedValues = parseCentreFormValues(values);
      sendCreatedCentre(parsedValues).then((response) => console.log(response));
    },
  });

  const getCareerData = (data) => {
    setCareers((item) => [...item, data]);
    formik.setFieldValue("careers", careers);
  };

  return (
    <div className="w-85% h-full bg-firstBg">
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
            <div className="w-4/5 flex flex-col">
              <label className="text-base font-normal mb-2" htmlFor="address">
                Dirección
              </label>
              <div className="w-full flex flex">
                <input
                  className="w-full h-11 pl-4 bg-secondBg rounded-l-md border-2 border-firstColor"
                  name="address"
                  placeholder="Agregar dirección del centro"
                  onChange={formik.handleChange}
                  value={formik.values.addressStreet}
                  type="text"
                />
                {formik.touched.addressStreet && formik.errors.addressStreet && (
                  <div className="relative">
                    <p className="errorMessage absolute">
                      {formik.errors.addressStreet}
                    </p>
                  </div>
                )}
                <input
                  className="w-16 h-11 pl-2 bg-secondBg rounded-r-md border-2 border-firstColor"
                  name="address"
                  placeholder="Puerta"
                  onChange={formik.handleChange}
                  value={formik.values.addressNumber}
                  type="text"
                />
                {formik.touched.addressNumber && formik.errors.addressNumber && (
                  <div className="relative">
                    <p className="errorMessage absolute">
                      {formik.errors.addressNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-4/5 flex flex-col">
              <label className="text-base font-normal mb-2" htmlFor="free">
                Privado/Publico
              </label>
              <CustomSelect
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
                htmlFor="centrePhone"
              >
                Teléfono
              </label>
              <input
                className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                name="centrePhone"
                placeholder="Agregar teléfono del centro"
                onChange={formik.handleChange}
                value={formik.values.centrePhone}
                type="number"
              />
              {formik.touched.centrePhone && formik.errors.centrePhone && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.centrePhone}
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
                htmlFor="centreSchedule"
              >
                Horarios
              </label>
              <CustomMultiSelect
                defaultValue="no select"
                name={"centreSchedule"}
                isMulti
                options={centreScheduleOptions}
                value={formik.values.centreSchedule}
                onChange={(value) =>
                  formik.setFieldValue("centreSchedule", value)
                }
                placeholder={"Agregar los horarios del centro"}
              />
              {formik.touched.centreSchedule && formik.errors.centreSchedule && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.centreSchedule}
                  </p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex flex-col">
              <h1 className="text-base font-normal">Carreras</h1>
              <div className="flex w-full h-11 mt-4 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between">
                <p className="text-placeHolderColor text-base my-auto pl-4">
                  Añadir carrera
                </p>
                <AddCarrer onSubmit={getCareerData} />
              </div>
              {formik.touched.careers && formik.errors.careers && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.careers}
                  </p>
                </div>
              )}
            </div>
            <div className="w-4/5 flex flex-col">
              <label className="text-base font-normal mb-2" htmlFor="pagelink">
                Link a la página
              </label>
              <input
                className="w-full h-11 pl-4 bg-secondBg rounded-md border-2 border-firstColor"
                name="pagelink"
                placeholder="Agregar página del centro"
                onChange={formik.handleChange}
                value={formik.values.pagelink}
              />
              {formik.touched.pagelink && formik.errors.pagelink && (
                <div className="relative">
                  <p className="errorMessage absolute">
                    {formik.errors.pagelink}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-1/5 flex items-center">
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
  );
};

export default CreateCentre;
