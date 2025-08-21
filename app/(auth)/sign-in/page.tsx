"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { EFormType } from "@/constans/consts";
import { SignInSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <AuthForm
      formType={EFormType.SIGN_IN}
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignIn;
