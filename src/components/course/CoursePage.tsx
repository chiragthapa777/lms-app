import { cn } from "@/lib/utils";
import { ICourse } from "@/types/course.type";
import { containerProps } from "../container";
import Viewer from "../rich-text/viewer";
import { CourseChapterAccordion } from "./CourseChapterAccordion";
import CourseDescription from "./CourseDescription";
import CourseReview from "./CourseReview";
import { useMemo } from "react";

type Props = {
  course: ICourse;
};

export function CourseContainer({
  children,
  className,
  ...props
}: Readonly<containerProps>) {
  return (
    <div className={cn("max-w-[700px] w-[95%] mx-auto", className)} {...props}>
      {children}
    </div>
  );
}

export default function CoursePage({ course }: Props) {
  const reviews = useMemo(
    () => course.enrollments.filter((e) => e.review),
    [course]
  );
  return (
    <div className="flex flex-col gap-4">
      <section className="info bg-slate-800 p-4 text-white">
        <CourseContainer className="flex gap-2 flex-col-reverse md:justify-between md:flex-row">
          <CourseDescription course={course} />
        </CourseContainer>
      </section>
      <CourseContainer>
        <h3 className="text-xl font-bold">Details</h3>
      </CourseContainer>
      <section className="">
        <CourseContainer className="p-4 border rounded-md">
          <Viewer content={course.description} />
        </CourseContainer>
      </section>
      <CourseContainer>
        <h3 className="text-xl font-bold">Chapters</h3>
      </CourseContainer>
      <section className="">
        <CourseContainer className="p-4 border rounded-md">
          <CourseChapterAccordion chapters={course.chapters} />
        </CourseContainer>
      </section>
      <CourseContainer>
        <h3 className="text-xl font-bold">Reviews</h3>
      </CourseContainer>
      <section className="reviews">
        <CourseContainer className="p-4 border rounded-md flex flex-col gap-2">
          {reviews.length > 0 ? (
            reviews
              .filter((e) => e.review)
              .map((e) => <CourseReview review={e} key={e.id} />)
          ) : (
            <div className="p-4 text-center">
              <p>No reviews yet</p>
            </div>
          )}
        </CourseContainer>
      </section>
    </div>
  );
}
