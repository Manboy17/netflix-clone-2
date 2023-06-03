import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Movie = ({ movie }) => {
  const [like, setLike] = useState(() => {
    const savedLike = localStorage.getItem(`like_${movie.id}`);
    return savedLike ? JSON.parse(savedLike) : false;
  });
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          image: movie.backdrop_path,
        }),
      });
      localStorage.setItem(`like_${movie.id}`, JSON.stringify(!like));
    } else {
      alert("Log in to add a movie!");
    }
  };

  if (!movie.backdrop_path) {
    return null;
  }

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative">
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
          <p className="flex items-center justify-center h-full font-bold text-xs md:text-sm ">
            {movie?.title}
          </p>
          <p onClick={saveShow}>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Movie;
