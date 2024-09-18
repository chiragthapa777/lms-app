import Image from "next/image";
import React from "react";
import Ratings from "../app/rating";
import { ICourse } from "@/types/course.type";
import moment from "moment";
import { Button } from "../ui/button";
import CourseEnrollButton from "./CourseEnrollButton";

type Props = {
  course: ICourse;
};

export default function CourseDescription({ course }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-2xl">{course.title}</h3>
        <div className=" ">{course.category}</div>
        <div className="flex text-lg gap-2 items-center">
          <p>{course.rating}</p>
          <Ratings
            value={course.rating}
            variant="destructive"
            size={13}
            asInput={true}
          />
          <p className="text-xs">
            ({course.enrollments.filter((e) => e.rating).length} ratings){" "}
            <span>{course.enrollments.length} students enrolled</span>
          </p>
        </div>
        <p className="text-xs">
          Created on {moment(course.createdAt).format("yyyy-mm-DD")}
        </p>
        <p className="text-xs">Total {course.chapters?.length} chapters</p>
        <h3 className=" text-lg">Rs {course.price}</h3>
        <div className="py-2">
          <CourseEnrollButton course={course} />
        </div>
      </div>
      <div className="h-56 w-full sm:w-auto rounded-md overflow-hidden">
        <Image
          src={course.photoLink}
          alt="Picture of the author"
          width={500}
          height={500}
          className="h-full w-full object-cover "
        />
      </div>
    </>
  );
}
