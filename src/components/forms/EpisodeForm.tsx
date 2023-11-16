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
import { Textarea } from "@/components/ui/textarea.tsx";
import { client } from "@/lib/client.ts";

interface EpisodeNewFormProps extends React.HTMLAttributes<HTMLDivElement> {
  animeId: string;
  episode?: Episode;
}

const formSchema = z.object({
  title: z.string().min(2).max(255),
  episodeNumber: z.coerce.number().int().min(1),
  filename: z.string().min(2).max(255),
  animeId: z
    .string()
    .regex(
      new RegExp(/^[a-z0-9-]+$/),
      "Id only could have lowercase and hypens",
    ),
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
    defaultValues: episode || { title: "", filename: "", episodeNumber: 0 },
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
        // FIXME cannot create anime, issue: episodeNumber?
        await client.anime.createEpisode(animeId, values);

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
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!episode && (
            <FormField
              control={form.control}
              name={"episodeNumber"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Episode Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Episode Number"}
                      type={"number"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
          <FormField
            control={form.control}
            name={"filename"}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Filename</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <p>TODO </p>
                {/* TODO file upload */}
              </>
            )}
          />

          {fieldError && (
            <p className={"mt-2 text-red-600 text-sm"}>{fieldError}</p>
          )}
          <Button
            variant={"default"}
            type={"submit"}
            disabled={isLoading}
            className={"mt-6 w-full"}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
