import React from "react";
import FilterForm from "../components/FilterForm";
import Map from "../components/Map";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-full h-full">
          <Map />
        </div>
        <FilterForm />
      </div>
    </>
  );
}
