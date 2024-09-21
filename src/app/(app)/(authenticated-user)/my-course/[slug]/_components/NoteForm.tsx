import {
  createNoteAction,
  updateNoteAction,
} from "@/actions/note/note.user.action";
import RichTextEditor from "@/components/text-editor";
import { Button, ButtonWithLoading } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NoteSchema } from "@/schemas/note.schema";
import { INote } from "@/types/course.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  note?: INote;
  chapterId: number;
  onComplete: (done: boolean) => void;
};

export default function NoteForm({ note, chapterId, onComplete }: Props) {
  const isEdit: boolean = useMemo(() => !!note, [note]);
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    mode: "all",
    defaultValues: {
      title: undefined,
      content: undefined,
      chapterId,
    },
  });
  const [loading, setLoading] = useState(false);
  const { setValue } = form;

  useEffect(() => {
    if (isEdit) {
      patchFormValue();
    }
  }, []);

  const patchFormValue = () => {
    if (note) {
      setValue("title", note.title, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
      setValue("content", note.content, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  };

  async function createNote(body: any) {
    const response = await createNoteAction(body);
    if (response.data) {
      toast.success("note created successfully");
      onComplete(true);
    } else {
      toast.error(response?.error?.message);
    }
  }

  async function updateNote(body: any) {
    if (note?.id) {
      const response = await updateNoteAction(note.id, body);
      if (response.data) {
        toast.success("note updated successfully");
        onComplete(true);
      } else {
        toast.error(response?.error?.message);
      }
    }
  }

  async function onSubmit(values: z.infer<typeof NoteSchema>) {
    setLoading(true);
    const body: any = {
      ...values,
    };
    if (!note) {
      await createNote(body);
    } else {
      updateNote(body);
    }
    setLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="col-span-2 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div>
                      <RichTextEditor {...field} key={note?.id ?? chapterId} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ButtonWithLoading
            type="submit"
            disabled={loading || !form.formState.isValid}
            loading={loading}
          >
            {isEdit ? "Save" : "Create"}
          </ButtonWithLoading>
        </form>
      </Form>
    </div>
  );
}
