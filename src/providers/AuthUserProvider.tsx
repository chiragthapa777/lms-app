"use client";
import { getUserAction } from "@/actions/auth/auth.action";
import { IUser } from "@/types/user/user.type";
import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext({});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<null | IUser>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );

  const setUser = (user: any) => {
    localStorage.setItem("user", user ? JSON.stringify(user) : "");
    setUserState(user);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = (user?: IUser) => {
    if (user) {
      return setUser(user);
    }
    getUserAction().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = (): any => {
  const user = useContext(UserContext);
  return user;
};
