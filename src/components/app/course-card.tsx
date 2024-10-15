"use client";
import { ICourse } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import Ratings from "./rating";

type Props = {
  course: ICourse;
  href?: string;
  buttonText?: string;
  hideRating?: boolean;
  hidePrice?: boolean;
  showProgress?: boolean;
};

export default function CourseCard({
  course,
  href,
  buttonText,
  hidePrice,
  hideRating,
  showProgress,
}: Props) {
  const ratingCount: number = useMemo(
    () => course.enrollments?.filter((e) => e.rating).length,
    [course]
  );

  const progress: number = useMemo(() => {
    if (!showProgress) return 0;
    const totalCourse = course.chapters.length;
    const totalCompleted = course.chapters.filter(
      (c) => c.views && c.views[0] && c.views[0].completed
    ).length;
    return (totalCompleted / totalCourse) * 100;
  }, [course, showProgress]);

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
      {showProgress === true && (
        <div className="flex flex-col">
          <Progress value={progress} className="w-[100%]" />
        </div>
      )}
      <div className="content flex flex-col gap-1">
        <h3 className=" text-primary text-sm">{course.title}</h3>
        <div className="text-sm text-muted-foreground">{course.category}</div>
        {!hideRating && (
          <div className="flex text-xs gap-1 items-center ">
            <p className="mt-1">{course.rating}</p>
            <Ratings
              value={course.rating}
              variant="destructive"
              size={13}
              asInput={true}
            />
            <p className="text-muted-foreground mt-1">({ratingCount})</p>
          </div>
        )}
        {!hidePrice && (
          <h3 className=" text-primary text-sm">Rs {course.price}</h3>
        )}
        <div>
          <Button variant={"outline"} size={"sm"} className="w-full">
            {buttonText ?? "Enroll"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
