'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import registerSchema from '@/schemas/register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import { userApi } from '@/lib/apiCall/userApi';
import { useRouter } from 'next/navigation';

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  // ✅ Correctly initialize the `form` variable
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await userApi.register(data);

      if (response.message === 'User registered successfully') {
        toast.success(response.message);
        router.push('/login');
      }
    } catch (error: any) {
      if (error.response?.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Something went wrong, please try again');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 rounded-lg shadow-lg bg-background text-text border border-border">
      <h2 className="text-3xl font-semibold text-center mb-6 text-primary">Sign Up</h2>

      {/* ✅ Use `form` inside the `Form` component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" aria-live="polite">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium">Full Name</Label>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="bg-secondary/20 focus:ring-2 focus:ring-accent focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </Button>
        </form>
      </Form>

      {/* Already have an account? */}
      <p className="text-sm text-center mt-4 text-muted-foreground">
        Already have an account?{' '}
        <a href="/login" className="text-accent font-medium hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
