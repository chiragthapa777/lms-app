"use client";
import { getUserAction } from "@/actions/auth/auth.action";
import { IUser } from "@/types/user/user.type";
import React, { use, useContext, useEffect, useState } from "react";

const UserContext = React.createContext({});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<null | IUser>(null);

  const setUser = (user: any) => {
    window.localStorage.setItem("user", user ? JSON.stringify(user) : "");
    setUserState(user);
  };

  useEffect(() => {
    setUserState(
      window.localStorage.getItem("user")
        ? JSON.parse(window.localStorage.getItem("user") as string)
        : null
    );
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

export const useUserContext = (): {
  user: IUser;
  setUser: any;
  loadUser: any;
} => {
  const user = useContext(UserContext);
  return user as {
    user: IUser;
    setUser: any;
    loadUser: any;
  };
};
