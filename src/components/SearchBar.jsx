import Search from "../assets/images/search.svg";

export default function SearchBar() {
  return (
    <>
      <div className="mt-16 mb-14 ml-[-24px] flex justify-center">
        <img
          src={Search}
          alt=""
          className=" w-6 h-6 bottom-[2px] left-[24px] relative padding"
        />
        <input
          className="pb-2 text-white pl-8 border-b-2 border-firstColor .placeholder-grayColorPlaceHolder placeholder:relative placeholder:bottom-[-1.1px] placeholder:tracking-wide bg-transparent w-[362px]"
          placeholder="Buscar institución"
        ></input>
      </div>
    </>
  );
}
