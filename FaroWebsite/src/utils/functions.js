import { Navigate } from "react-router-dom"

export const isMobile = () => {
  return window.innerWidth <= 960 ? true : false
}

export const parseCentreFormValues = (values) => {
  const cSchParsedValues = []
  const careerParsedValues = []
  Object.entries(values).forEach(([key ,value]) => {
    if (key === 'centreSchedules') {
      Object.entries(value).forEach(([,{ value }]) => {
        cSchParsedValues.push(value)
      })
    }
    if (key === 'careers') {
      Object.entries(value).forEach(([,value]) => {
        careerParsedValues.push(value)
      })
    }
  })
  const data = {
    ...values,
    centreSchedules: cSchParsedValues,
    careers: careerParsedValues
  }
  return data
}

export const checkIfExists = (data, item) => {
   if (data.includes(item)){
      return true
   }else {
      return false
   }
}
export const preventEnterSubmit  = (event) => {
  if(event.key === 'Enter'){
    event.preventDefault();
  }
}

export const loginRedirection = (error) => {
  if (error === 401){
  return <Navigate to="/login" />}
}
