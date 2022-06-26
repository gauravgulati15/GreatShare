import React, { useContext, useEffect, useState } from "react";
import GetCurrentUser from "../API/GetCurrentUser";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    userID: "",
    username: "",
    emailID: "",
    phoneNo: ""
    
  });

  // const [user, setUser] = useState({
  //   userID: "",
  //   username: "",
  //   emailID: "",
  //   phoneNo: ""
    
  // });
  // useEffect(() => {
  //   let Current_User = GetCurrentUser();
  //   if (Current_User !== "") {
  //     setUser(Current_User);
  //   }
  // }, [authenticated]);
  return (
    <UserContext.Provider value={{ user, authenticated, setAuthenticated, setUser }}>
      {children};
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
