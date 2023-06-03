import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../utils/Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const fetchMovies = async () => {
    const res = await axios.get(requests.requestPopular);
    setMovies(res.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  function truncateString(string, n) {
    if (string?.length > n) {
      return string.slice(0, n) + "...";
    } else {
      return string;
    }
  }

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 ml-3 py-2 px-5">
              Watch Later
            </button>
          </div>

          <p className="text-gray-300 text-sm">{movie?.release_date}</p>
          <p className="w-full text-gray-300 md:max-w-[70%] lg:max-w-[50%] mt-2">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
