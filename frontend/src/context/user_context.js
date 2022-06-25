import React, { useContext, useEffect, useState } from "react";
import GetCurrentUser from "../API/GetCurrentUser";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    let Current_User = GetCurrentUser();
    if (Current_User !== "") {
      setUser(Current_User);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children};</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
