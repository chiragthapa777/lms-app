import UserFrom from "@/components/user/UserFrom";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <p className=" text-primary font-bold text-2xl">Add Admin</p>
      </div>
      <UserFrom />
    </div>
  );
}
