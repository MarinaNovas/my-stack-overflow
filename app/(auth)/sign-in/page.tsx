"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { EFormType } from "@/constans/consts";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <AuthForm
      formType={EFormType.SIGN_IN}
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
