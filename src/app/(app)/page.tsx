import { getUserAction } from "@/actions/auth/auth.action";
import CourseCard from "@/components/app/course-card";
import { Container } from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function AppPage() {
  const getUser = await getUserAction();
  return (
    <div className="flex flex-col gap-6 p-6">
      <Container>
        <Carousel className="w-[100%] sm:w-[80%] mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1 ">
                <img
                  src="/web-banner.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1 ">
                <img
                  src="/node-banner.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1 ">
                <img
                  src="/react-banner.jpg"
                  className="w-full h-full object-cover"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </Container>
    </div>
  );
}
