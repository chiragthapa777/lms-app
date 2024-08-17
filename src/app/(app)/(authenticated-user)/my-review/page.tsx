"use client";
import { useUserContext } from "@/providers/AuthUserProvider";
import React from "react";

type Props = {};

export default function page({}: Props) {
  const { user } = useUserContext();
  return <div>my courses, {JSON.stringify(user)}</div>;
}
