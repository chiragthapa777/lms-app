import React, { Suspense } from "react";
import Loader from "./loader";

type Props = {
  children: React.ReactNode;
  loader?: React.ReactNode;
  error?: React.ReactNode;
};

export default function CustomSuspense<T = any>(props: Props) {
  const {
    children,
    loader = <Loader className=" rounded-lg min-h-32" />,
    error,
  } = props;
  return <Suspense>{children}</Suspense>;
}
