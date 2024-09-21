import { listNoteAction } from "@/actions/note/note.user.action";
import Loader from "@/components/loader";
import { IChapter, ICourse, INote } from "@/types/course.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NoteCard from "./NoteCard";
import { NoteCardPopup } from "./NoteCardPopup";

export default function NoteView({
  chapter,
}: {
  course: ICourse;
  chapter: IChapter;
}) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    fetchNotes();
  }, [chapter]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await listNoteAction({ chapterId: chapter.id });
      if (response.data) {
        setNotes(response.data.data);
      } else {
        throw new Error(response.error?.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (error as string));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b py-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Notes</h3>
        <NoteCardPopup
          chapterId={chapter.id}
          key={chapter.id}
          triggerFetch={() => fetchNotes()}
        />
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notes?.map((note) => (
            <NoteCard note={note} key={note.id} triggerFetch={() => fetchNotes()} />
          ))}
        </div>
      )}
    </div>
  );
}
