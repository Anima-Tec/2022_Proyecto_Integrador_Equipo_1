import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCIfWaZPMHJaqzMX6R36zyz0-8RenAzKyo");

Geocode.setLanguage("en");

Geocode.setRegion("es");

Geocode.setLocationType("ROOFTOP");

Geocode.enableDebug();

export const getCoordinatesFromAddress = (address) => {
  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    (error) => {
      console.error(error);
    }
  );
};
