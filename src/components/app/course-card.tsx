"use client";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import Ratings from "./rating";
import { Button } from "../ui/button";

type Props = {};

export default function CourseCard({}: Props) {
  const [rating, setRating] = useState(3);
  return (
    <div className="flex flex-col gap-2">
      <div className="img">
        <Image
          src="https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Picture of the author"
          width={500}
          height={500}
          className="h-40 object-cover"
        />
      </div>
      <div className="content flex flex-col gap-1">
        <h3 className=" text-primary text-sm">This is course title</h3>
        <div className="text-sm text-muted-foreground">Category</div>
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
        <h3 className=" text-primary text-sm">Rs 400040</h3>
        <div>
          <Button variant={"outline"} size={"sm"} className="w-full">Enroll</Button>
        </div>
      </div>
    </div>
  );
}
