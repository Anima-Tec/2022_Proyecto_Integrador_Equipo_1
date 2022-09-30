import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  useJsApiLoader,
} from "@react-google-maps/api";
import InfoModal from "./InfoModal";
import logoDark from "../assets/images/logoDark.svg";

const containerStyle = {
  height: "100vh",
  zIndex: 10,
};

const center = {
  lat: -34.908812,
  lng: -56.190687,
};

export const getCentres = async () => {
  const response = await fetch(
    `http://localhost:7000/centres/centresCoordinates`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export const getCentreInfo = async (id) => {
  const response = await fetch(
    `http://localhost:7000/centres/centre?id=` + id,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

function MyComponent() {
  const [markers, setMarkers] = useState([]);
  const [selectedCentreId, setSelectedCentreId] = useState(null);
  const [info, setInfo] = useState(null);
  const [map, setMap] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      let centres = await getCentres();
      setMarkers(centres); // ...
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCentreId !== null) {
      async function fetchData() {
        // You can await here
        let centre = await getCentreInfo(selectedCentreId);
        setInfo(centre); // ...
      }
      fetchData();
    }
  }, [selectedCentreId]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCIfWaZPMHJaqzMX6R36zyz0-8RenAzKyo",
  });

  /*
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  */

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  var myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  var myOptions = {
    styles: myStyles,
    zoom: 12,
    center: center,
  };

  return isLoaded ? (
    <div className="h-full relative">
      {info && (
        <InfoModal
          idCentre={info.idCentre}
          centreName={info.centreName}
          free={info.free}
          addressStreet={info.addressStreet}
          addressNumber={info.addressNumber}
          schoolarLevel={info.schoolarLevel}
          centreSchedules={info.centreSchedules}
          phoneNumber={info.phoneNumber}
          careers={info.careers}
        />
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        onUnmount={onUnmount}
        options={myOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markers.length > 0 &&
          markers.map((marker) => {
            return (
              <Marker
                icon={logoDark}
                onClick={() => setSelectedCentreId(marker.idCentre, true)}
                key={marker.idCentre}
                position={{ lat: marker.latitude, lng: marker.longitude }}
              />
            );
          })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
