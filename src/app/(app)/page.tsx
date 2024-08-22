import { listCourseActionUser } from "@/actions/course/course.action";
import CourseCard from "@/components/app/course-card";
import { Container } from "@/components/container";
import Loader from "@/components/loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ICourse } from "@/types/course.type";
import { Suspense } from "react";

export default async function AppPage() {
  const courses = listCourseActionUser({});
  return (
    <div className="flex flex-col gap-6 p-6">
      <Container>
        <Carousel className="w-[100%] sm:w-[80%] mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1 ">
                <img
                  src="/web-banner.jpg"
                  className="w-full h-full object-cover border"
                  alt=""
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1 ">
                <img
                  src="/node-banner.jpg"
                  className="w-full h-full object-cover border"
                  alt=""
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1 ">
                <img
                  src="/react-banner.jpg"
                  className="w-full h-full object-cover border"
                  alt=""
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden sm:block" />
          <CarouselNext className="hidden sm:block" />
        </Carousel>
      </Container>
      <Container className="flex flex-col gap-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Recommendation for you
        </h4>
        <Suspense fallback={<Loader className=" rounded-lg min-h-32" />}>
          {courses.then((response) => {
            const courses = response.data?.data ?? [];
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {courses.map((course: ICourse) => (
                  <CourseCard course={course} />
                ))}
              </div>
            );
          })}
        </Suspense>
      </Container>
    </div>
  );
}
