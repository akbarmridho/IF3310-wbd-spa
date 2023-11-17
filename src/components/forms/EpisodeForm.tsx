import React, { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { isAxiosError } from "axios";
import { ApiValidationError, ApiValidationSingleError } from "@/lib/Api.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.ts";
import { client } from "@/lib/client.ts";
import FileUpload from "@/components/FIleUpload.tsx";

interface EpisodeNewFormProps extends React.HTMLAttributes<HTMLDivElement> {
  animeId: string;
  episode?: Episode;
}

const formSchema = z.object({
  title: z.string().min(2).max(255),
  episodeNumber: z.number().int().min(1),
  filename: z.string().min(2).max(255),
});

export interface Episode extends z.infer<typeof formSchema> {}

export function EpisodeForm({
  className,
  animeId,
  episode,
  ...props
}: EpisodeNewFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: episode || {
      title: "",
      filename: "",
      episodeNumber: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);

    try {
      if (episode) {
        await client.anime.updateEpisode(animeId, episode.episodeNumber, {
          ...values,
        });

        toast({
          description: "Episode updated",
        });
      } else {
        await client.anime.createEpisode(animeId, {
          animeId,
          ...values,
        });

        toast({
          description: "Episode Created",
        });
      }

      navigate("/anime/view/" + animeId);
    } catch (e) {
      if (isAxiosError<ApiValidationSingleError | ApiValidationError>(e)) {
        setIsLoading(false);

        if (e.response && e.response.status === 400) {
          if ("message" in e.response.data) {
            const message = e.response.data.message;

            if (message) {
              setFieldError(message);
            }
          } else if ("messages" in e.response.data) {
            const messages = e.response.data.messages;

            messages.forEach((val) => {
              if (val.field && val.message) {
                form.setError(val.field as keyof Episode, {
                  type: "custom",
                  message: val.message,
                });
              }
            });
          }
        }
      } else {
        console.log(e);
      }
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!episode && (
            <FormField
              control={form.control}
              name={"episodeNumber"}
              render={({ field: props }) => {
                const { onChange, ...fields } = props;
                return (
                  <FormItem>
                    <FormLabel>Episode Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Episode Number"}
                        type={"number"}
                        {...fields}
                        onChange={(e) => onChange?.(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder={"Title"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUpload
            onSuccess={(val) => {
              form.setValue("filename", val);
              setFieldError(val === "" ? "File failed to upload" : null);
              setIsLoading(false);
            }}
            startSubmitting={() => {
              setIsLoading(true);
            }}
          />

          {fieldError && (
            <p className={"mt-2 text-red-600 text-sm"}>{fieldError}</p>
          )}
          <Button
            variant={"default"}
            type={"submit"}
            disabled={isLoading || fieldError !== null}
            className={"mt-6 w-full"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
