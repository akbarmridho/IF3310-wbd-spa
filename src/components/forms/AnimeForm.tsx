import React, { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { client } from "@/lib/client.ts";

interface AnimeNewFormProps extends React.HTMLAttributes<HTMLDivElement> {
  anime?: Anime;
}

const formSchema = z.object({
  id: z
    .string()
    .regex(
      new RegExp(/^[a-z0-9-]+$/),
      "Id only could have lowercase and hypens",
    ),
  title: z.string().min(2).max(255),
  broadcastInformation: z.string().optional(),
  totalEpisodes: z.number().int().min(1).optional(),
  status: z.enum(["upcoming", "airing", "aired"]),
});

export interface Anime extends z.infer<typeof formSchema> {}

export function AnimeForm({ className, anime, ...props }: AnimeNewFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: anime || { title: "", id: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (anime) {
        await client.anime.updateAnime(anime.id, { ...values });

        toast({
          description: "Anime updated",
        });
      } else {
        await client.anime.createAnime(values);

        toast({
          description: "Anime Created",
        });
      }

      navigate("/");
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
                form.setError(val.field as keyof Anime, {
                  type: "custom",
                  message: val.message,
                });
              }
            });
          }
        }
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!anime && (
            <FormField
              control={form.control}
              name={"id"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anime Id</FormLabel>
                  <FormControl>
                    <Input placeholder={"Id"} {...field} />
                  </FormControl>
                  <FormDescription>
                    Input your anime identifier. Only lowercase and - symbol are
                    allowed
                  </FormDescription>
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
            name={"broadcastInformation"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broadcast Information</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"totalEpisodes"}
            render={({ field: props }) => {
              const { onChange, ...fields } = props;
              return (
                <FormItem>
                  <FormLabel>Total Episodes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Total Episode"}
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

          <FormField
            control={form.control}
            name={"status"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Status"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"upcoming"}>Upcoming</SelectItem>
                    <SelectItem value={"airing"}>Airing</SelectItem>
                    <SelectItem value={"aired"}>Aired</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
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
