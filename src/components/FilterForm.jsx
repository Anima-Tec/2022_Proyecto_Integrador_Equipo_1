import SearchBar from "./SearchBar";
import React from "react";

export default function FilterForm() {
  return (
    <>
      <div className=" flex flex-col h-screen w-[554px] bg-firstBg text-white">
        <h1 className="mt-8 flex justify-center text-3xl">Filtrar</h1>
        <SearchBar />
        <form className="flex items-center flex-col" action="">
          <div className="w-4/5">
            <label className="text-base font-normal mb-2">Turnos</label>
          </div>
          <div className="w-4/5 mt-9">
            <label className="text-base font-normal mb-2">Grado</label>
          </div>
          <div className="w-4/5 mt-9">
            <label className="text-base font-normal mb-2">Carreras</label>
          </div>
          <div className="w-4/5 mt-9">
            <label className="text-base font-normal mb-2">
              Privado/Público
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
