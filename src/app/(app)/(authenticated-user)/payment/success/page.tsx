"use client";
import { enrollUserAction } from "@/actions/enrollment/user.action";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  searchParams: {
    data: string;
  };
};

export default function page(data: Props) {
  const [error, setError] = useState("");
  const [courseId, setCourseId] = useState("");
  const router = useRouter();

  const enroll = async ({
    courseId,
    transactionCode,
  }: {
    transactionCode: string;
    courseId: string;
    userId: string;
  }) => {
    try {
      const data = await enrollUserAction({
        courseId: Number(courseId),
        transactionId: transactionCode,
      });
      if (data.error?.message) {
        setError(data.error?.message?.toString());
      } else {
        router.push("/my-course");
      }
    } catch (error) {}
  };

  const goBack = () => {
    if (!courseId) {
      router.push("/");
    } else {
      router.push(`/course/${courseId}`);
    }
  };

  useEffect(() => {
    if (data.searchParams.data) {
      const payload: any = JSON.parse(
        Buffer.from(data.searchParams.data, "base64").toString("utf-8")
      );
      const transactionCode = payload?.transaction_code;
      const transactionUUID = payload?.transaction_uuid;
      const courseId = transactionUUID?.split("_")[0];
      if (courseId) {
        setCourseId(courseId);
      }
      const userId = transactionUUID?.split("_")[1];
      enroll({ transactionCode, courseId, userId });
    }
  }, []);

  return (
    <div className="w-full h-[300px] flex justify-center items-center flex-col">
      <div>
        {error && error !== "" ? (
          <div className="flex flex-col gap-2">
            <p className="text-red-700">{error}</p>
            <Button onClick={() => goBack()}>Go back</Button>
          </div>
        ) : (
          <>
            <p>Processing your payment, you will be redirected soon</p>
            <Loader />
          </>
        )}
      </div>
    </div>
  );
}
