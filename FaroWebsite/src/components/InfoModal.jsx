import React from "react"
import {
  ClockIcon,
  MapPinIcon,
  PhoneArrowDownLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

const InfoModal = ({openModal, centreName, schoolarLevel, free, addressStreet, centreSchedules, phoneNumber, careers}) => {
  
  return (
    <div className="bg-firstBg text-white absolute  left-0 z-20 h-[92vh] w-96 overflow-scroll">
      <div className="flex flex-col w-full p-4">
        <XMarkIcon
          className="w-12 right-0 top-0 pr-[inherit] pt-[inherit] absolute cursor-pointer"
          onClick={() => openModal(false)}
        />
        <h2 className="text-5xl font-bold">{centreName}</h2>
        <h3>
          {schoolarLevel} - {free ? "Público" : "Privado"}
        </h3>
        <div className="w-full mt-2 mb-2.5 h-[1px] mb-2 mt-2 bg-white"></div>
      </div>
      <div className="flex flex-col px-4">
        <section className="flex items-center">
          <MapPinIcon className="w-8 mr-2" />
          {addressStreet}
        </section>
        <section className="flex items-center mt-2">
          <ClockIcon className="w-8 mr-2" />
          {centreSchedules.length > 1
            ? centreSchedules.join(",  ")
            : centreSchedules}
        </section>
        <section className="flex items-center mt-2">
          <PhoneArrowDownLeftIcon className="w-8 mr-2" />
          {phoneNumber}
        </section>
        <div className="w-full mt-8 mb-2.5 h-[1px] mb-2 mt-2 bg-white"></div>
      </div>
      <div className="px-4 overflow-y-scroll flex-flex-col overflow-y-scroll">
        <h2 className="text-xl font-bold">Carreras: </h2>
        <div className="shadow-lg m-2 p-2 overflow-y-scroll">
          {careers?.map((career) => (
            <div key={career.idCareer}>
              <li className="text-2xl font-bold pt-2">{career.careerName}</li>
              <li>{career.careerDescription}</li>
              <li>{career.duration}</li>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoModal
