import mapMarker from "../assets/images/mapMarker.svg";
import clock from "../assets/images/clock.svg";
import phone from "../assets/images/phone.svg";

export default function InfoModal(props) {
  console.log("props: " + props.idCentre);
  return (
    <>
      <ul className="bg-white flex flex-col text-black text-lg text-white absolute top-0 left-0 z-20 h-full w-[300px] p-4">
        <li className="text-5xl font-extrabold mb-[-4px]">
          {props.centreName}
        </li>
        <li className="">
          {props.schoolarLevel} - {props.free ? "Público" : "Privado"}
        </li>
        <div className="w-full mt-2 mb-2 h-[1px] mb-2 mt-2 bg-black"></div>
        <li className="mb-1 flex text-wrap">
          <img src={mapMarker} alt="" /> {props.addressStreet}
          {props.addressNumber}
        </li>
        <li className="mb-1 flex ">
          <img className="mr-[4.5px]" src={clock} alt="" />
          {props.centreSchedules}
        </li>
        <li className="mb-1 flex">
          <img className="mr-[4.5px]" src={phone} alt="" />
          {props.phoneNumber}
        </li>
        <div className="w-full mt-2 mb-2 h-[1px] mb-2 mt-2 bg-black"></div>
        <h2>Carreras: </h2>
        <div className="shadow-lg bg-lightGray m-2 overflow-y-scroll">
          {props.careers?.map((car) => (
            <>
              <li className="text-xl font-extrabold">{car.careerName}</li>
              <li className="text-xl">{car.careerDescription}</li>
              <li className="text-xl">{car.duration}</li>
            </>
          ))}
        </div>
      </ul>
    </>
  );
}
