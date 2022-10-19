import React, { useState, useEffect } from "react";
import Search from "../assets/images/search.svg";
import { useFormik } from "formik";
import CareerController from "../networking/controllers/Career-Controller";
import CustomSelect from "../components/CustomSelect";

export default function CareerSearchBar() {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [careersFormikOp, setCareersFormikOp] = useState([{}]);

  const formik = useFormik({
    initialValues: {
      SelectedCareer: {},
    },
    onSubmit: (values) => {},
  });
  useEffect(() => {
    const getCareers = async (value) => {
      setCareers(await CareerController.getAllCareers());
      setCareersFormikOp(
        careers.map((car) => ({
          value: car.idCareer,
          label: car.careerName,
        }))
      );
    };
    getCareers();
  }, [careers, careersFormikOp]);

  return (
    <>
      <div className="w-4/5 flex flex-col">
        <label className="text-base font-normal mb-2" htmlFor="free">
          Privado/Publico
        </label>
        <CustomSelect
          name={"free"}
          options={careersFormikOp}
          value={formik.values.career}
          onChange={(value) =>
            formik.setFieldValue("SelectedCareer", value.value)
          }
          placeholder={"carreras"}
          className="text-white"
        />
      </div>
    </>
  );
}
