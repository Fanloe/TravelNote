import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.get(
      `http://localhost:8080/verifyNormalUser?username=${inputs.username}&password=${inputs.password}`
    );
    // window.sessionStorage.setItem('accessToken', res.data.token)
    console.log(res.data.data);
    setCurrentUser(res.data.data);
    //currentUser = {username,password,_id,authority}
  };

  const logout = async (inputs) => {
    console.log(currentUser);
    const res = await axios.post("/users/logout");
    console.log(res);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
