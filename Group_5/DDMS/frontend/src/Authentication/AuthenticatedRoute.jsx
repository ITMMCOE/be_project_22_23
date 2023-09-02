import React, { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function AuthenticatedRoute(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserData = () => {
    const user = JSON.parse(secureLocalStorage.getItem("user"));
    if (!user || user === undefined) {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserData();
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
}
