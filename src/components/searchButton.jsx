import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";

const SearchButton = ({ placeholder, centresName, searchValue }) => {
  const [search, setSearch] = useState("");
  const [showCentres, setShowCentres] = useState(false)

  useEffect(() => {
    searchValue(search)
  }, [search])
  

  const results = !search
    ? centresName
    : centresName?.filter((dato) =>
        dato?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setShowCentres(true)
  };

  const handleClick = (item) => {
    setSearch(item)
    setShowCentres(false)
  }

  return (
    <div className="dropdown flex w-full h-11 bg-secondBg rounded-md border-2 border-solid border-firstColor text-white justify-between">
      <input
        value={search}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full h-full pl-4 bg-secondBg"
      />
       {centresName?.length > 0 && (
        <ChevronDownIcon
          className="w-6 cursor-pointer text-firstColor mr-2"
          onClick={() => setShowCentres(!showCentres)}
        />
      )}
      {(showCentres) && (
        <div className="w-full bg-blackOpacity z-10 dropdown-content">
          {results.map((item) => (
            <div className="flex justify-between hoverBg" key={item } onClick={() => handleClick(item)}>
              <p className="py-1 pl-2" key={item}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchButton;
