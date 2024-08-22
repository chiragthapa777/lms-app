"use client";
import { ICourse } from "@/types/course.type";
import { Edit, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  course: ICourse;
};

export default function CourseDetail({ course }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold capitalize underline flex gap-3 justify-start items-center">
        <span>{course.title}</span>{" "}
        <Link href={`/admin/course/edit/${course.id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </h1>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-2">
              <p className="font-bold">Category:</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <p>{course.category}</p>
            </div>
            <div className="col-span-12 md:col-span-2">
              <p className="font-bold">price:</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <p>Rs {course.price}</p>
            </div>
            <div className="col-span-12 md:col-span-2">
              <p className="font-bold">Enrollments:</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <p>{course.enrollments.length}</p>
            </div>
            <div className="col-span-12 md:col-span-2">
              <p className="font-bold">chapters:</p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <p>{course.chapters.length}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          {" "}
          <img
            src={course.photoLink}
            alt=""
            className="h-[200px]  object-scale-down"
          />
        </div>
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: course.description }}
        className=" border p-4"
      ></p>
      <h1 className="text-lg font-bold capitalize flex gap-3 justify-start items-center">
        <span>Chapters</span>{" "}
        <Link href={`/admin/course/${course.id}/chapter`}>
          <PlusCircle className="h-4 w-4" />
        </Link>
      </h1>
      <div className="border p-4 flex flex-col divide-y">
        {course.chapters.map((chapter) => (
          <Link
            href={`/admin/course/${course.id}/chapter/${chapter.id}`}
            key={chapter.id}
            className="p-4"
          >
            {chapter.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
