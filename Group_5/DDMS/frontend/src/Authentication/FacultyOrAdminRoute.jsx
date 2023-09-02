import React, { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function FacultyOrAdminRoute(props) {
  const navigate = useNavigate();
  const [isFacultyOrAdmin, setIsFacultyOrAdmin] = useState(false);
  const checkUserRole = () => {
    const user = JSON.parse(secureLocalStorage.getItem("user"));
    if (user.role === "student") {
      setIsFacultyOrAdmin(false);
      return navigate("/dashboard");
    }
    setIsFacultyOrAdmin(true);
  };

  useEffect(() => {
    checkUserRole();
  }, [isFacultyOrAdmin]);
  return (
    <React.Fragment>{isFacultyOrAdmin ? props.children : null}</React.Fragment>
  );
}
