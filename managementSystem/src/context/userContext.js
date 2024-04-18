import React, { createContext,useEffect, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('users')) || null // 初始化用户信息为null
  );
  
  useEffect(()=>{
    localStorage.setItem('users', JSON.stringify(user));
  },[user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
