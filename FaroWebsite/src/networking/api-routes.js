const API_ROUTES = {
  EXAMPLE: "/example",
  EXAMPLE_ID: (id) => `/example/${id}`,
  CENTRES_COORDINATES: () => `/centres/centresCoordinates`,
  CENTRES_NAMES: () => `/centres/centresName`,
  CENTRE: (id) => `/centres/centre?id=${id}`,
  CREATE_CENTRE: `/centres`,
  CAREERS: () => `/careers/`,
  FUZZY_CENTRE: (name) => `/centres/centre?nameLike=${name}`,
  FUZZY_CAREER: (name) => `/careers/career?nameLike=${name}`,
};

export { API_ROUTES };
