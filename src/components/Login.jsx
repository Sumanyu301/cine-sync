import React from "react";
import Header from "./Header";
import { useState } from "react";
import { useRef } from "react";
import validate from "../utils/loginvalidate";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../utils/firebase";
const Login = () => {
  const [signin, setsignin] = useState(true);
  const [res, setRes] = useState(null);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const scrollToForm = () => {
    const formElement = document.getElementById("loginForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validatesignin = (event) => {
    event.preventDefault();
    const res = validate(email.current.value, password.current.value);
    setRes(res);
    if (signin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setRes(errorMessage);
        });
    }
  };
  const handlesignin = (event) => {
    event.preventDefault();
    setsignin(!signin);
  };

  return (
    <>
      <div className="absolute">
        <Header></Header>
      </div>
      <div className="bg-black h-screen flex flex-col justify-center items-center">
        <div className="absolute">
          <img src="src/assets/bg-img1.jpeg" alt="" className="h-screen" />
        </div>
        <button
          className=" bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded absolute animate-bounce mt-96"
          onClick={scrollToForm}
        >
          Get Started
        </button>
      </div>

      <div
        id="loginForm"
        className="h-screen bg-black flex flex-row justify-center items-center relative"
      >
        <form
          action=""
          className="bg-red-600 bg-opacity-50 p-8 rounded w-full md:w-128"
        >
          <h1
            className="text-white text-3xl font-bold mb-4"
            style={{ fontFamily: "fantasy" }}
          >
            {signin ? "Sign Up" : "Sign In"}
          </h1>
          {signin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 w-full rounded mb-4 bg-white"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-3 w-full rounded mb-4 bg-white"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 w-full rounded mb-4 bg-white"
          />
          {res && <p className="text-red-500 text-sm mt-1">{res}</p>}
          <button
            className="p-4 w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={validatesignin}
          >
            {signin ? "Sign Up" : "Sign In"}
          </button>
          <div className="text-white text-center mt-4">
            <p>{signin ? "Already registered" : "Don't have an account?"}</p>
            <button className="text-blue-400" onClick={handlesignin}>
              {signin ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="text-white text-center mt-4 w-full md:w-128 p-10">
          <h1
            className="text-5xl font-bold mb-5"
            style={{ fontFamily: "fantasy" }}
          >
            cine-sync
          </h1>
          <h2 className="text-3xl" style={{ fontFamily: "fantasy" }}>
            Save your favourites easily and always have something to watch.
          </h2>
        </div>
      </div>
    </>
  );
};

export default Login;
