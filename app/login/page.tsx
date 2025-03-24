"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import loginSchema from "@/schemas/login";
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
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState; // Extracting submission state

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      toast.success("Sign in successful");
      router.replace("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 rounded-xl shadow-lg 
                    bg-backgroundL dark:bg-backgroundD 
                    border-2 border-borderL dark:border-borderD
                    transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 
                     bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Welcome Back
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium text-textL dark:text-textD block">
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

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium text-textL dark:text-textD block">
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
            className="w-full py-3 mt-4 bg-primary text-backgroundL 
                      hover:bg-accent dark:hover:bg-secondary
                      rounded-lg font-semibold
                      transition-all duration-300 transform hover:scale-[1.02]
                      shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      {/* Sign Up Link */}
      <p className="text-sm text-center mt-6 text-textL dark:text-textD">
        New to Coditor?{" "}
        <Link
          href="/register"
          className="text-primary dark:text-secondary font-semibold 
                    hover:underline underline-offset-4"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
