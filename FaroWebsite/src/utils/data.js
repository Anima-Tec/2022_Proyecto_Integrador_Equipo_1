import * as Yup from 'yup';

export const centreValidation = () => Yup.object().shape({
  centreName: Yup.string()
    .required('Ingrese el nombre del centro'),
  addressStreet: Yup.string()
    .required('Ingrese la dirección del centro'),
  addressNumber: Yup.number()
    .required('Ingrese el numero de puerta'),
  free: Yup.boolean().nullable()
    .required('Porfavor ingrese el tipo del centro'),
  phoneNumber: Yup.string()
    .min(8, 'Ingrese un numero correcto')
    .max(8, 'Ingrese un numero correcto'),
  schoolarLevel: Yup.string()
    .required('Ingrese los grados del centro'),
  centreSchedules: Yup.array()
    .min(1, 'Ingrese almenos un horario')
    .required('Ingrese los horarios del centro'),
})

export const AddCareerValidation = () => Yup.object().shape({
  careerName: Yup.string()
    .required('Porfavor ingrese el nombre de la carrera'),
  degree: Yup.string()
    .required('Porfavor ingrese el título de la carrera'),
  careerDescription: Yup.string()
    .required('Porfavor ingrese la descripción de la carrera'),
  duration: Yup.string()
    .required('Porfavor ingrese la duracion de la carrera'),
})

export const schoolarLevelOptions = [
  { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
  { value: 'Bachillerato', label: 'Bachillerato' },
  { value: 'Universitario', label: 'Universitario' }
]
export const centreScheduleOptions = [
  { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
  { value: 'Vespertino', label: 'Vespertino' },
  { value: 'Matutino', label: 'Matutino' },
  { value: 'Nocturno', label: 'Nocturno' },
  { value: 'Completo', label: 'Horario completo' },
  
]
export const freeOptions = [
    { value: 'Sin elegir', label: 'sin elegir', isDisabled: true },
    { value: false, label: 'Privado' },
    { value: true, label: 'Público' }
]
export const style = {
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? '' : '',
    color: '#fff'
  })
}
