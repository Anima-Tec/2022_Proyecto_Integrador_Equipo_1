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

const handleFilterData = (data) => {
  const searchBy = diffValue(data, 'all') 
        if (searchBy.length > 0){
          const getMarkers = async () => {
            setFilterData(await CentreController.getCentresByFilter(searchBy))
          }
          getMarkers()
        }
}
const handleFilterCentre = (centre) => {
  setFilterCentre(centre)
}
if (isMobile()) {
  return <MobileErrorView />
} else {
  return (
    <div className="h-screen">
      <NavBar/>
      <div className="flex h-[92vh] min-h-sm overflow-x-hidden">
        <div className="w-full h-full">
          <Map filterCentre={filterCentre} filters={filterData}/>
        </div>
        <FilterForm filterCentre={handleFilterCentre} filterData={handleFilterData}/>
      </div>
    </div>
  );
}
}
export default Home;
