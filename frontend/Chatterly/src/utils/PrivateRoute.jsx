import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "./storage";

const PrivateRoute = ({ element: Element }) => {
  const navigate = useNavigate();
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const access = getLocalStorage("accessToken");
      const sessionStatus = access && access !== null;
      if (!sessionStatus) {
        navigate("/login");
      }
      setHasSession(sessionStatus);
    };

    checkSession();
  }, []);

  return hasSession ? <Element /> : null;
};

export default PrivateRoute;
