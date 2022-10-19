import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import CareerController from "../networking/controllers/Career-Controller";
import CustomSelect from "../components/CustomSelect";
import { checkIfExists } from "../utils/functions";
import CentreController from "../networking/controllers/Centre-Controller";
import SearchButton from "./searchButton";

export default function FilterForm({filterData, filterCentre}) {
  const [careersFormikOp, setCareersFormikOp] = useState([{}]);
  const [centresNames, setCentresNames] = useState([]);

  useEffect(() => {
    async function fetchCentres() {
      const centres = await CentreController.getCentres()
      setCentresNames(centres)
    }
    fetchCentres()
  }, [])

  const formik = useFormik({
    initialValues: {
      selectedCareer: 'all',
      centreSchedule: 'all',
      career: 'all',
      free: 'all',
      schoolarLevel: 'all',
    },
    onSubmit: (values) => {
        filterData(values)
    },
  });

  //crear otra prop para manejar la busqueda del centro y que se actualice asi, 
  //tambien manejar que se actualice cuando le damos click al boton de busqueda

  const schoolarLevel = [
    { value: "all", label: "Todos" },
    { value: "Bachillerato", label: "Bachillerato" },
    { value: "Universitario", label: "Universitario" },
  ];

  const centreSchedule = [
    { value: "all", label: "Todos" },
    { value: "Vespertino", label: "Vespertino" },
    { value: "Matutino", label: "Matutino" },
    { value: "Nocturno", label: "Nocturno" },
    { value: "Completo", label: "Horario completo" },
  ];

  const freeOptions = [
    { value: "all", label: "Todos" },
    { value: false, label: "Privado" },
    { value: true, label: "Público" },
  ];

  useEffect(() => {
    const getCareers = async () => {
      let valueLabel = []
      await CareerController.getAllCareers()
        .then((response) => response.map(career => 
          valueLabel.push({
            value: career.idCareer,
            label: career.careerName
          })))
      setCareersFormikOp(valueLabel)
    }
    getCareers()
  },[])

  const careersOptions = [
    { value: "all", label: "Todos" },
    ...careersFormikOp,
  ];
  const searchCentreName = async (searchValue) => {
    const centres = centresNames.map((centre) => centre.centreName)
    if (checkIfExists(centres, searchValue)) {
      const values = await CentreController.getCentreByName(searchValue)
      filterCentre(values)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center h-full w-[400px] bg-firstBg text-white overflow-y-scroll">
        <h1 className="my-8 text-3xl">Filtrar</h1>
        <SearchButton
            placeholder="Ingrese nombre del centro a buscar"
            centresName={centresNames.map((centre) => centre.centreName)}
            className={
              "dropdown flex w-4/5 h-14 min-h-[2.75rem] bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between mt-8"
            }
            searchValue={searchCentreName}
          />
        <form className="w-full h-full flex flex-col items-center mt-8" onSubmit={formik.handleSubmit}>
          <div className="w-4/5 flex flex-col">
            <label className="text-base font-normal mb-2" htmlFor="free">
              Privado/Publico
            </label>
            <CustomSelect
              name={"free"}
              options={freeOptions}
              value={formik.values.free}
              onChange={(value) => formik.setFieldValue("free", value.value)}
              placeholder={"Horario"}
            />
          </div>
          <div className="w-4/5 flex flex-col mt-6">
            <label
              className="text-base font-normal mb-2"
              htmlFor="centreSchedule"
            >
              Horarios
            </label>
            <CustomSelect
              defaultValue="no select"
              name={"centreSchedule"}
              options={centreSchedule}
              value={formik.values.centreSchedule}
              onChange={(value) =>
                formik.setFieldValue("centreSchedule", value.value)
              }
              placeholder={"Horarios"}
            />
          </div>
          <div className="w-4/5 flex flex-col mt-6">
            <label className="text-base font-normal mb-2" htmlFor="free">
              Carreras
            </label>
            <CustomSelect
              name={"SelectedCareer"}
              options={careersOptions}
              value={formik.values.career}
              onChange={(value) =>
                formik.setFieldValue("career", value.value)
              }
              placeholder={"Carreras"}
              className="text-white"
            />
          </div>
          <div className="w-4/5 flex flex-col mt-6">
            <label
              className="text-base font-normal mb-2"
              htmlFor="schoolarLevel"
            >
              Nivel Escolar
            </label>
            <CustomSelect
              name={"schoolarLevel"}
              options={schoolarLevel}
              value={formik.values.schoolarLevel}
              onChange={(value) =>
                formik.setFieldValue("schoolarLevel", value.value)
              }
              placeholder={"Nivel escolar"}
            />
          </div>
          <button
              className={"text-white cursor-pointer mt-20 mb-4 normal-small-button"}
              type="submit"
            >
              Filtrar
            </button>
        </form>
      </div>
    </>
  );
}
