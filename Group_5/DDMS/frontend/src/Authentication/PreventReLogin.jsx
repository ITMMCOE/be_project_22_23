import React, { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function PreventReLogin(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserData = () => {
    const user = JSON.parse(secureLocalStorage.getItem("user"));
    if (!user || user === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      return navigate("/dashboard");
    }
  };

  useEffect(() => {
    checkUserData();
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? null : props.children}</React.Fragment>;
}
