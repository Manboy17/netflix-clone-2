import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const Row = ({ title, fetchUrl, rowId }) => {
  const [movies, setMovies] = useState([]);

  const fetchUrlData = async () => {
    const fetch = await axios.get(fetchUrl);
    setMovies(fetch.data.results);
  };

  useEffect(() => {
    fetchUrlData();
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft += 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-lg p-4">{title}</h2>
      <div className="flex items-center relative group">
        <BsArrowLeftCircleFill
          onClick={slideLeft}
          className="rounded-full opacity-50 cursor-pointer hover:opacity-100 absolute z-10 hidden group-hover:block left-0"
          color="white"
          size={30}
        />
        <div
          id={"slider" + rowId}
          className="relative w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {movies?.map((movie, id) => (
            <Movie key={id} movie={movie} />
          ))}
        </div>
        <BsArrowRightCircleFill
          onClick={slideRight}
          className="rounded-full opacity-50 cursor-pointer hover:opacity-100 z-10 hidden group-hover:block absolute right-0"
          color="white"
          size={30}
        />
      </div>
    </>
  );
};

export default Row;
