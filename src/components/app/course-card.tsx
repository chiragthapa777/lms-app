"use client";
import { ICourse } from "@/types/course.type";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import Ratings from "./rating";
import Link from "next/link";

type Props = { course: ICourse; href?: string };

export default function CourseCard({ course, href }: Props) {
  const ratingCount: number = useMemo(
    () =>
      course.enrollments?.filter((e) => typeof e.rating === "number").length,
    [course]
  );
  return (
    <Link href={href ?? `course/${course.id}`} className="flex flex-col gap-2">
      <div className="aspect-square">
        <Image
          src={course.photoLink}
          alt="Picture of the author"
          width={1000}
          height={1000}
          className=" object-scale-down border h-full w-full"
        />
      </div>
      <div className="content flex flex-col gap-1">
        <h3 className=" text-primary text-sm">{course.title}</h3>
        <div className="text-sm text-muted-foreground">{course.category}</div>
        <div className="flex text-xs gap-1">
          <p>{course.rating}</p>
          <Ratings
            value={course.rating}
            variant="destructive"
            size={13}
            asInput={true}
          />
          <p className="text-muted-foreground">({ratingCount})</p>
        </div>
        <h3 className=" text-primary text-sm">Rs {course.price}</h3>
        <div>
          <Button variant={"outline"} size={"sm"} className="w-full">
            Enroll
          </Button>
        </div>
      </div>
    </Link>
  );
}
