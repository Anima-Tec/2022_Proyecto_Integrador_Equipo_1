import { getCoordinatesFromAddress } from "../api/geocode";

export const isMobile = () => {
  return window.innerWidth <= 960 ? true : false;
};

export const parseCentreFormValues = (values) => {
  const cSchParsedValues = [];
  const careerParsedValues = [];
  let centreAdressStreet = "";
  let centreAdressNumber = 0;
  let centreAddress = "";
  let latitude = 0;
  let longitude = 0;
  Object.entries(values).forEach(([key, value]) => {
    if (key === "centreSchedule") {
      Object.entries(value).forEach(([, { value }]) => {
        cSchParsedValues.push(value);
      });
    }
    if (key === "careers") {
      Object.entries(value).forEach(([, value]) => {
        careerParsedValues.push(value);
      });
    }

    if (key === "adressStreet") {
      centreAdressStreet = value;
    }
    if (key === "addressNumber") {
      centreAdressNumber = value;
    }
    centreAddress = centreAdressStreet + " " + centreAdressNumber;
    const { latitudeA, longitudeA } = getCoordinatesFromAddress(centreAddress);
    latitude = latitudeA;
    longitude = longitudeA;
  });
  const data = {
    ...values,
    latitude: latitude,
    longitude: longitude,
    centreSchedule: cSchParsedValues,
    careers: careerParsedValues,
  };
  return data;
};

export const checkIfExists = (data, item) => {
  if (data.includes(item)) {
    return true;
  } else {
    return false;
  }
};
