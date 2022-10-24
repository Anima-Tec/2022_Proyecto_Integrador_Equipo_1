import React, { useState } from "react";
import FilterForm from "../components/FilterForm";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import CentreController from "../networking/controllers/Centre-Controller";
import { diffValue, isMobile } from "../utils/functions";
import MobileErrorView from "../utils/mobileErrorView";

const Home = () => {
  const [filterData, setFilterData] = useState();
  const [filterCentre, setFilterCentre] = useState();
  const [resetFilters, setResetFilters] = useState();
  //estados del componente

const handleFilterData = (data) => {
  const searchBy = diffValue(data, 'all') 
  //funcion que busca el valor diferente, recibe datos y un string, verifica que cada uno de esos
  //paramentros sea distinto al que se le paso como segundo argumento
        if (searchBy.length > 0){
          const getMarkers = async () => {
            setFilterData(await CentreController.getCentresByFilter(searchBy))
            //si encontro uno llama a la api y setea el estado a lo que recibe de los controllers
          }
          getMarkers()
        }
}
//maneja que le llega por props desde filterform
const handleFilterCentre = (centre) => {
  setFilterCentre(centre)
}
const handleClearState = (state) => {
  setResetFilters(!state)
}

const handleResetFilter = (resetState) => {
  setResetFilters(resetState)
}
//maneja el reset del formulario para que se vuelvan a cargar los marcadores del mapa
if (isMobile()) {
  return <MobileErrorView />
  //se fija si el width es <= 900 y si si devuelve un componente para mobile, sino devuelve el html
} else {
  return (
    <div className="h-screen">
      <NavBar/>
      <div className="flex h-[92vh] min-h-sm overflow-x-hidden">
        <div className="w-full h-full">
          <Map filterCentre={filterCentre} filters={filterData} clearFilters={resetFilters} clearState={handleClearState} />
          {/* le mandamos los estados via props al mapa */}
        </div>
        <FilterForm filterCentre={handleFilterCentre} filterData={handleFilterData} clearFilters={handleResetFilter}/>
        {/* segun le llegan las props desde el componente hijo llama a esas funciones para manejar que hacer con la info */}
      </div>
    </div>
  );
}
}
export default Home;
