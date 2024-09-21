"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameShortForm } from "@/lib/utils";
import { IEnrollment } from "@/types/course.type";
import Ratings from "../app/rating";

type Props = { review: IEnrollment };

export default function CourseReview({ review }: Props) {
  return (
    <div className="border rounded-sm p-4 flex justify-start items-start gap-4">
      <Avatar>
        <AvatarImage src={review.user.avatar} alt="@shadcn" />
        <AvatarFallback>{getNameShortForm(review.user.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <div className="font-bold flex gap-4">
          <p>{review.user.name}</p>
          <div className="flex text-xs gap-1 items-center">
            <Ratings
              value={review.rating}
              variant="destructive"
              size={13}
              asInput={true}
            />
            (<p>{review.rating}</p>)
          </div>
        </div>
        <div className="">{review.review}</div>
      </div>
    </div>
  );
}
