"use client";
import { ICourse } from "@/types/course.type";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import Ratings from "./rating";

type Props = { course: ICourse };

export default function CourseCard({ course }: Props) {
  const [rating, setRating] = useState(3);
  return (
    <div className="flex flex-col gap-2">
      <div className="img">
        <Image
          src={course.photoLink}
          alt="Picture of the author"
          width={500}
          height={500}
          className="h-40 object-scale-down border"
        />
      </div>
      <div className="content flex flex-col gap-1">
        <h3 className=" text-primary text-sm">{course.title}</h3>
        <div className="text-sm text-muted-foreground">{course.category}</div>
        <div className="flex text-xs gap-1">
          <p>4.4</p>
          <Ratings
            value={rating}
            variant="destructive"
            size={13}
            asInput={true}
            onValueChange={setRating}
          />
          <p className="text-muted-foreground">(1245)</p>
        </div>
        <h3 className=" text-primary text-sm">Rs {course.price}</h3>
        <div>
          <Button variant={"outline"} size={"sm"} className="w-full">
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
}
