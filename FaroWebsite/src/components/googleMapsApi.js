import React, { useState, useEffect,useRef } from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  DirectionsRenderer
} from 'react-google-maps';

const directionsRequest = ({ DirectionsService, origin, destination }) =>
  new Promise((resolve, reject) => {
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(origin.lat, origin.lon),
        destination: new window.google.maps.LatLng(
          destination.lat,
          destination.lon
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          resolve(result)
        } else {
          reject(status)
        }
      }
    )
  })

  const MapComponent = () => {
    const [directions, setDirections] = useState({})
    const [markers, setMarkers] = useState([]);
    const [userCoords, setUserCoords] = useState({lat: -35, lng: -56});
    const mapRef = useRef(null);
    const DirectionsService = new window.google.maps.DirectionsService()
    const fetchDirections = async () => {
      const direction = await directionsRequest({
        DirectionsService,
          origin: {
            lat: markers[0].latLng.lat,
            lon: markers[0].latLng.lng
          },
          destination: {
            lat: markers[1].latLng.lat,
            lon: markers[1].latLng.lng
          },
      })     
      setDirections(direction);
    }    
    
    useEffect(() => {
      if (markers.length == 2) {
        fetchDirections()
       }
    }, [markers])
    
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }
  const zoomCenter = {
    center: {lat:userCoords?.lat, lng:userCoords?.lng},
    zoom: 9,
  }
  
  const addMarker = (info) => { 
    const latLng = {
      lat:info.latLng.lat(), 
      lng:info.latLng.lng()
    }
    if (markers.length == 2) {
      markers.shift()
    }
    setMarkers([...markers, {
     latLng
    }]);
  }

  return (
    <GoogleMap
      defaultCenter={zoomCenter.center}
      defaultZoom={zoomCenter.zoom}
      onClick={addMarker}
      ref={mapRef}
    >
      {markers?.map((element, i) => 
        <Marker 
          key={i}
          position={element.latLng}

        />) }
      <DirectionsRenderer
        directions={directions}
        options={{
          suppressMarkers:true, 
          polylineOptions:{
            strokeColor:'#0DFF00'
          } 
        }}
        
      />
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(MapComponent))

