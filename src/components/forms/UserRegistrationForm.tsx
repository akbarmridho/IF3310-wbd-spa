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
import { client } from "@/lib/client.ts";
import { isAxiosError } from "axios";
import { ApiValidationSingleError } from "@/lib/Api.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.ts";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(8).max(127),
  name: z.string().min(2).max(127),
});

export function UserRegistrationForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await client.register.register({
        username: values.username,
        password: values.password,
        name: values.name,
      });

      toast({
        description: "Register success",
      });

      navigate("/login");
    } catch (e) {
      if (isAxiosError<ApiValidationSingleError>(e)) {
        setIsLoading(false);

        if (e.response && e.response.status === 400) {
          const message = e.response.data.message;

          if (message) {
            setFieldError(message);
          }
        }
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={"name"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"username"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder={"username"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder={"password"}
                    type={"password"}
                    {...field}
                  />
                </FormControl>
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
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
