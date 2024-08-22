import CourseForm from "@/components/course/CourseForm";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className=" text-primary font-bold text-2xl">Create new course</p>
      </div>
      <CourseForm />
    </div>
  );
}
