import "./App.css";

// Components
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";

// Firebase
import app from "./firebase";
import { auth, firestore } from "./firebase";

// React-Router-Dom
import { Routes, Route } from "react-router-dom";

// React-Redux-Toolkit
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { setCurrentUser, logout } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const rememberMe = localStorage.getItem("remember-me");
      console.log(user);
      console.log(rememberMe);

      if (user) {
        if (rememberMe === "true") {
          console.log("relogging");
          dispatch(setCurrentUser({ currentUser: user }));
        } else {
          console.log("logging out");
          dispatch(setCurrentUser({ currentUser: null }));
        }
      } else {
        dispatch(setCurrentUser({ currentUser: null }));
      }
    });

    return unsubscribe;
  }, []);

  const currentUser = useSelector((state) => state.auth.currentUser);

  return <>{currentUser ? <Dashboard /> : <Authentication />}</>;
}

export default App;
