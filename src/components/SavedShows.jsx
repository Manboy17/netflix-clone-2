import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const handleDelete = async (movieId) => {
    try {
      const result = movies.filter((item) => item.id !== movieId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
      localStorage.removeItem(`like_${movieId}`);
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-lg p-4">My Movies</h2>
      {!movies.length ? (
        <h3 className="p-4 text-center">No added movies yet.</h3>
      ) : (
        <div className="flex items-center relative group">
          <BsArrowLeftCircleFill
            onClick={slideLeft}
            className="rounded-full opacity-50 cursor-pointer hover:opacity-100 absolute z-10 hidden group-hover:block left-0"
            color="white"
            size={30}
          />
          <div
            id={"slider"}
            className="relative w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
          >
            {movies.map((movie, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${movie?.image}`}
                  alt={movie?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
                  <p className="flex items-center justify-center h-full font-bold text-xs md:text-sm ">
                    {movie?.title}
                  </p>
                  <p
                    onClick={() => handleDelete(movie.id)}
                    className="absolute right-4 top-4 text-gray-300"
                  >
                    <AiOutlineClose size={20} />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <BsArrowRightCircleFill
            onClick={slideRight}
            className="rounded-full opacity-50 cursor-pointer hover:opacity-100 z-10 hidden group-hover:block absolute right-0"
            color="white"
            size={30}
          />
        </div>
      )}
    </>
  );
};

export default SavedShows;
