const BASE_URL = "http://localhost:7000";
const devToken = localStorage.getItem("token");

export const userValidation = (user, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user,
      password: password,
    }),
  }).then((response) => response.json());
};

export const requestCentre = async (path, method, body) =>
  await fetch(`${BASE_URL}/${path}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-JWT-Token": devToken,
    },
    body: JSON.stringify(body),
  });

export const sendCreatedCentre = (centreData) => {
  return fetch(`${BASE_URL}/centres`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-JWT-Token": devToken,
    },
    body: JSON.stringify({
      centreData,
    }),
  }).then((response) => response);
};
export const sendEditedCentre = (centreId) => {
  return fetch(`${BASE_URL}/centres/centre?name=${centreId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-JWT-Token": devToken,
    },
  }).then((response) => response.json());
};
export const getCentresName = () => {
  return fetch(`${BASE_URL}/centres/centresName`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-JWT-Token": devToken,
    },
  }).then((response) => response.json());
};

export const getCentreValues = (centreId) => {
  return fetch(`${BASE_URL}/centres/centre?name=${centreId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-JWT-Token": devToken,
    },
  }).then((response) => response.json());
};

//hacer controllers para cada uno de los controllers que hay en el back
//hacer serlializers
