import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const SearchButton = ({ placeholder, centresName, searchValue, className, clearValue, searchBar }) => {
  const [search, setSearch] = useState("");
  const [showCentres, setShowCentres] = useState(false)

  useEffect(() => {
    searchValue(search)
  }, [search])
  
  useEffect(() =>{
    if(clearValue){
      setSearch('')
    }
  },[clearValue])

  const results = !search
    ? centresName
    : centresName?.filter((item) =>
        item?.toLowerCase().includes(search?.toLocaleLowerCase())
      );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setShowCentres(true)
  };

  const handleClick = (item) => {
    setSearch(item)
    setShowCentres(false)
  }
  if (searchBar) {
    return(
      <div className="flex items-center border-b-2 border-firstColor border-solid dropdown">
        <MagnifyingGlassIcon className="w-6"/>
          <input
          className="w-fulltext-white bg-transparent"
          placeholder={placeholder}
          onChange={handleSearch}
        />
        {centresName?.length > 0 && (
        <ChevronDownIcon
          className="w-6 cursor-pointer text-white mr-2"
          onClick={() => setShowCentres(!showCentres)}
          onBlur={() => setShowCentres(!showCentres)}
        />
      )}
      {(showCentres) && (
        <div className="w-full bg-blackOpacity z-10 dropdown-content">
          {results.map((item) => (
            <div className="flex justify-between hoverBg" key={item} onClick={() => handleClick(item)}>
              <p className="py-1 pl-2" key={item}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    )
  } else{
  return (
    <div className={className}>
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
            <div className="flex justify-between hoverBg" key={item} onClick={() => handleClick(item)}>
              <p className="py-1 pl-2" key={item}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
};

export default SearchButton;
