import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
      <Link to="/">
        <h1 className="text-red-600 font-bold text-4xl cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="pr-4">Account</button>
          </Link>
          <Link to="/signup">
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded bg-red-600 cursor-pointer"
            >
              Log out
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/signin">
            <button className="pr-4">Sign in</button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-2 rounded bg-red-600 cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
