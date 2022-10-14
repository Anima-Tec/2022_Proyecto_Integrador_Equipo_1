import React, { useState, useEffect, useRef } from "react";
import FilterForm from "../components/FilterForm";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import CentreController from "../networking/controllers/Centre-Controller";

export default function Home() {
  const [centres, setCentres] = useState([{}]);
  const didMountRef = useRef(false);

  useEffect(() => {
    /*if (!didMountRef.current) {
      didMountRef.current = true;
    } else {*/
    async function fetchMarkers() {
      setCentres(await CentreController.getCentreCoordinates());
    }
    fetchMarkers();
    //}
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-full h-full">
          <Map markers={centres} setMarkers={setCentres} />
        </div>
        <FilterForm centres={centres} setCentres={setCentres} />
      </div>
    </>
  );
}
