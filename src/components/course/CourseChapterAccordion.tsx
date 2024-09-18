import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IChapter } from "@/types/course.type";
import Viewer from "../rich-text/viewer";

export function CourseChapterAccordion({ chapters }: { chapters: IChapter[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((item) => (
        <AccordionItem value={item.id?.toString()} key={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <Viewer content={item.content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
