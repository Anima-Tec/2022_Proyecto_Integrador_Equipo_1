const API_ROUTES = {
  LOGIN: () => `/login`,
  CENTRES_COORDINATES: () => `/centres/CentresCoordinates`,
  CENTRE: (id) => `/centres/centre?id=${id}`,
  CENTRES: () => `centres/centresName`,
  CENTRE_BASE: () => `/centres`,
  FUZZY_CENTRE: (name) => `/centres/centre?nameLike=${name}`,
  CENTRE_BY_NAME: (name) => `/centres/centre?name=${name}`,
  FUZZY_CAREER: (name) => `/careers/career?nameLike=${name}`,
  CAREER: (id) => `careers/career?idCareer=${id}`,
  CAREERS: () => `/careers/`,
  DELETE_CAREER: (idCareer, idCentre) =>
    `careers/career?idCareer=${idCareer}&idCentre=${idCentre}`,
  CENTRE_BY_FILTER: (values) => `/centres/centre?${values}`,
}

export { API_ROUTES }
