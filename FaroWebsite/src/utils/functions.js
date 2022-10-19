import {getCoordinatesFromAddress} from '../api/geocode'
export const isMobile = () => {
  return window.innerWidth <= 960 ? true : false
}

export const parseCentreFormValues = async (values) => {
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
  const address = values.addressStreet + " "+values.addressNumber
  const {lat, lng} = await getCoordinatesFromAddress(address)
  const data = {
    ...values,
    centreSchedules: cSchParsedValues,
    careers: careerParsedValues,
    latitude: lat,
    longitude: lng
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

export const diffValue = (obj, value) => { 
  let values = []
  Object.entries(obj).forEach((item) => {
  if (item[1] !== value){
    values.push([item[0], item[1]])
  } 
})
return values
}

export const addQueryParams= (values) => {
  const valuesLength = values.length
  let queryParams = ''
  values.forEach((value,index) => {
    if (index !== valuesLength - 1){
    queryParams = `${queryParams}${value[0]}=${value[1]}&`
  }else{
    queryParams = `${queryParams}${value[0]}=${value[1]}`
  }
})
return queryParams
}
