import * as Yup from "yup";

export const centreValidation = () =>
  Yup.object().shape({
    centreName: Yup.string().required("Porfavor ingrese el nombre del centro"),
    addressStreet: Yup.string().required(
      "Porfavor ingrese la calle del centro"
    ),
    addressNumber: Yup.string().required(
      "Porfavor ingrese el número de puerta del centro"
    ),
    free: Yup.boolean()
      .nullable()
      .required("Porfavor ingrese el tipo del centro"),
    centrePhone: Yup.string().min(8, "Ingrese un numero correcto"),
    schoolarLevel: Yup.string().required(
      "Porfavor ingrese los grados del centro"
    ),
    centreSchedule: Yup.array()
      .min(1, "Porfavor ingrese almenos un horario")
      .required("Porfavor ingrese los horarios del centro"),
    careers: Yup.array()
      .nullable()
      .min(1, "Porfavor ingrese al menos una carrera")
      .required("Porfavor ingrese al menos una carrera al centro"),
    pagelink: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Ingrese una url correcta"
    ),
  });

export const AddCareerValidation = () =>
  Yup.object().shape({
    careerName: Yup.string().required(
      "Porfavor ingrese el nombre de la carrera"
    ),
    careerTitle: Yup.string().required(
      "Porfavor ingrese el título de la carrera"
    ),
    careerDescription: Yup.string().required(
      "Porfavor ingrese la descripción de la carrera"
    ),
    careerDuration: Yup.string().required(
      "Porfavor ingrese la duracion de la carrera"
    ),
  });

export const schoolarLevelOptions = [
  { value: "Sin elegir", label: "sin elegir", isDisabled: true },
  { value: "Bachillerato", label: "Bachillerato" },
  { value: "Universitario", label: "Universitario" },
];
export const centreScheduleOptions = [
  { value: "Sin elegir", label: "sin elegir", isDisabled: true },
  { value: "Vespertino", label: "Vespertino" },
  { value: "Matutino", label: "Matutino" },
  { value: "Nocturno", label: "Nocturno" },
  { value: "Horario completo", label: "Horario completo" },
];
export const freeOptions = [
  { value: "Sin elegir", label: "sin elegir", isDisabled: true },
  { value: false, label: "Privado" },
  { value: true, label: "Público" },
];
export const style = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? "" : "",
    color: "#FFFFFF",
  }),
};
