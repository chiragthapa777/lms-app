import { listCourseActionUser } from "@/actions/course/course.action";
import CourseCard from "@/components/app/course-card";
import { Container } from "@/components/container";
import Loader from "@/components/loader";
import { ICourse } from "@/types/course.type";
import React, { Suspense } from "react";

type Props = { searchParams: { search?: string } };

export default function page({ searchParams }: Props) {
  const courses = listCourseActionUser({
    search: searchParams.search || undefined,
  });
  return (
    <div className="flex flex-col gap-6 p-6">
      <Container className="flex flex-col gap-4">
        {searchParams.search ? (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Result for `<span>{searchParams.search}</span>`
          </h4>
        ) : (
          <></>
        )}
        <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
          {courses.then((response) => {
            const courses = response.data?.data ?? [];
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {courses.map((course: ICourse) => (
                  <CourseCard course={course} key={course.id} />
                ))}
              </div>
            );
          })}
        </Suspense>
      </Container>
    </div>
  );
}
