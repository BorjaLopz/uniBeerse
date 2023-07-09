import { useParams, Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import BeerIcon from "./BeerIcon";

function BeerCard() {
  const { get } = useServer();
  const [beer, setBeer] = useState({});
  const { id } = useParams();

  const fetchBeerId = async () => {
    try {
      const { data } = await get({ url: `/beer/id/${id}` });
      setBeer(data.data[0]);
    } catch (e) {
      console.log("Error: ", e.message);
    }
  };

  useEffect(() => {
    fetchBeerId();
  }, []);
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="w-full md:w-1/3 bg-white grid place-items-center">
          {beer.img_file !== "" ? (
            <img
              src={beer.img_file}
              alt={`Imagen de ${beer.brand} | ${beer.name}`}
              className="rounded-xl"
              width={300}
            />
          ) : (
            <BeerIcon />
          )}
        </div>
        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <p className="text-gray-500 font-medium hidden md:block">
              {beer.style}
            </p>
          </div>
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {beer.brand} | {beer.name}
          </h3>
          {beer.comments !== "" ? (
            <p className="md:text-lg text-gray-500 text-base">
              {beer.comments}
            </p>
          ) : (
            <p className="md:text-lg text-gray-500 text-base">{`${
              beer.name
            }  de ${beer.brand.toLowerCase()} es una cerveza ${beer.style.toLowerCase()}`}</p>
          )}
          {beer.score ? (
            <p className="text-xl font-black text-gray-800">
              {beer.score}
              <span className="font-normal text-gray-600 text-base">/10</span>
            </p>
          ) : (
            <p className="text-xl font-black text-gray-800">
              {beer.score}
              <span className="font-normal text-gray-600 text-base">
                Sin valoración aún
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BeerCard;
