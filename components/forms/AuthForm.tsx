"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Control, DefaultValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { input, z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EFormType, TFormType } from "@/constans/consts";
import ROUTES from "@/constans/routes";

export interface IAuthFormProps<T extends z.ZodType<any, any, any>> {
  formType: TFormType;
  schema: T;
  defaultValues: DefaultValues<z.input<T>>;
  onSubmit: SubmitHandler<z.output<T>>;
}

const AuthForm = <T extends z.ZodType<any, any, any>>({
  schema,
  formType,
  defaultValues,
  onSubmit,
}: IAuthFormProps<T>) => {
  // 1. Define your form.
  const form = useForm<z.input<T>, any, z.output<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async () => {
    // TODO: Authentication
  };
  const buttonText = formType === EFormType.SIGN_IN ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control as Control<z.input<T>>}
            name={field as Path<input<T>>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700 ">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toLocaleUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    className="paragraph-regular background-light900_dark300 light-border-2 rext-dark300 text-dark300_light700 no-focus min-h-12  rounded-1.5 border"
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Sign In..." : "Sign Up...") : buttonText}
        </Button>
        {formType === EFormType.SIGN_IN ? (
          <p>
            Dont have an account?{" "}
            <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
