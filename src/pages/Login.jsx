import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.warn(error.message);
      setError("Auth error, try again!");
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="w-full h-full hidden sm:block object-cover absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ceb3b1eb-2673-4dd9-a6e3-0cd7a5e130ee/a436ca8e-6034-4759-a760-fbe7250a88df/NL-en-20230522-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg"
        />
        <div className="bg-black/60 top-0 left-0 fixed w-full h-screen"></div>
        <div className="fixed w-full py-24 px-4 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto text-white bg-black/70">
            <div className="mx-auto py-16 max-w-[320px]">
              <h1 className="text-3xl font-bold">Sign in</h1>
              {error && <p className="text-red-600 py-2">{error}</p>}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email or phone number"
                  className="w-full mx-auto p-3 m-2 bg-gray-700 rounded"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full mx-auto p-3 m-2 bg-gray-700 rounded"
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign in
                </button>

                <div className="flex items-center justify-between text-sm text-[#b3b3b3]">
                  <p>
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>

                <div className="py-10">
                  <span className="text-[#b3b3b3] mr-2 text-sm">
                    New to Netrflix?
                  </span>
                  <Link to="/signup">Sign up</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
