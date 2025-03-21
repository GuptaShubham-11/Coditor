'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import loginSchema from '@/schemas/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      if (response.error === 'CredentialsSignin') {
        toast.success('Sign in successful');
      } else {
        toast.error(response.error);
      }
    }

    if (response?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 rounded-lg shadow-lg bg-background text-text border border-border">
      <h2 className="text-3xl font-semibold text-center mb-6 text-primary">Login</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" aria-live="polite">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium">Email</Label>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    className="bg-secondary/20 focus:ring-2 focus:ring-accent focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium">Password</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-secondary/20 focus:ring-2 focus:ring-accent focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-2 mt-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all disabled:opacity-60 disabled:bg-primary/70"
            disabled={form.formState.isSubmitting}
            aria-busy={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>

      {/* Don't have an account? */}
      <p className="text-sm text-center mt-4 text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/register" className="text-accent font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
