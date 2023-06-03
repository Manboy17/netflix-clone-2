import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ceb3b1eb-2673-4dd9-a6e3-0cd7a5e130ee/a436ca8e-6034-4759-a760-fbe7250a88df/NL-en-20230522-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg"
        />
        <div className="h-[550px] w-full top-0 left-0 bg-black/60 fixed "></div>
        <div className="absolute top-[10%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Movies</h1>
        </div>
        <SavedShows />
      </div>
    </>
  );
};

export default Account;
