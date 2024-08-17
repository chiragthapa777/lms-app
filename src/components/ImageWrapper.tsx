import { cn } from "@/lib/utils";
import {
  ImageLoader,
  OnLoadingComplete,
  PlaceholderValue,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

type Props = { src?: string } & Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
> & {
    alt: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    fill?: boolean | undefined;
    quality?: number | `${number}` | undefined;
    priority?: boolean | undefined;
    loading?: "eager" | "lazy" | undefined;
    placeholder?: PlaceholderValue | undefined;
    blurDataURL?: string | undefined;
    unoptimized?: boolean | undefined;
    overrideSrc?: string | undefined;
    onLoadingComplete?: OnLoadingComplete | undefined;
    loader?: ImageLoader | undefined;
    layout?: string | undefined;
    objectFit?: string | undefined;
    objectPosition?: string | undefined;
    lazyBoundary?: string | undefined;
    lazyRoot?: string | undefined;
  } & React.RefAttributes<HTMLImageElement | null>;

export default function ImageWrapper({ src, className, ...props }: Props) {
  return (
    <div className="w-full h-full">
      {src ? (
        <Image src={src} className={className} {...props} />
      ) : (
        <div
          className={cn(
            "w-full h-full border bg-muted flex items-center text-sm justify-center",
            className
          )}
        >
          No Image
        </div>
      )}
    </div>
  );
}
