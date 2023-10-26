import "./App.css";

// Components
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";

// Ant Design
import { Spin } from "antd";

// Firebase
import app from "./firebase";
import { auth, firestore } from "./firebase";

// React-Router-Dom
import { Routes, Route } from "react-router-dom";

// React-Redux-Toolkit
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { setCurrentUser, logout } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();

  const [loadingUser, setLoadingUser] = useState(true);

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
    setLoadingUser(false) ;
    return unsubscribe;
  }, []);

  const currentUser = useSelector((state) => state.auth.currentUser);

  if (loadingUser) {
    return <Spin style={{ marginLeft: "50vw", marginTop: "50vh" }} />;
  }
  return <>{currentUser ? <Dashboard /> : <Authentication />}</>;
}

export default App;
