"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import registerSchema from "@/schemas/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { userApi } from "@/lib/apiCall/userApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await userApi.register(data);

      if (response.message === "User registered successfully") {
        toast.success(response.message);
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response?.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-10 rounded-2xl shadow-xl 
                    bg-backgroundL dark:bg-backgroundD 
                    border border-borderL dark:border-borderD
                    transition-all duration-300 hover:shadow-2xl">

      {/* Title */}
      <h2 className="text-4xl py-6 font-bold text-center
                     bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Sign Up
      </h2>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-semibold text-textL dark:text-textD">
                  Full Name
                </Label>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-accent dark:text-secondary" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-semibold text-textL dark:text-textD">
                  Email Address
                </Label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-accent dark:text-secondary" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-semibold text-textL dark:text-textD">
                  Password
                </Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-accent dark:text-secondary" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-primary text-white 
                      hover:bg-accent dark:hover:bg-secondary
                      rounded-lg font-semibold
                      transition-all duration-300 transform hover:scale-[1.02]
                      shadow-md hover:shadow-lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Creating Account...
              </span>
            ) : (
              "Get Started"
            )}
          </Button>
        </form>
      </Form>

      {/* Already Have an Account? */}
      <p className="text-sm text-center mt-6 text-textL dark:text-textD">
        Already registered?{" "}
        <Link
          href="/login"
          className="text-primary dark:text-secondary font-semibold hover:underline underline-offset-4"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
