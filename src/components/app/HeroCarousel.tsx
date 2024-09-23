"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type Props = {};

export default function HeroCarousel({}: Props) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (api) {
        if (current === count) {
          // If we're at the last slide, go back to the first
          api.scrollTo(0);
        } else {
          api.scrollNext();
        }
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId);
  }, [api, current, count]);
  return (
    <Carousel className="w-[100%] sm:w-[80%] mx-auto" setApi={setApi}>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
