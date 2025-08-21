"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { EFormType } from "@/constans/consts";
import { SignUpSchema } from "@/lib/validation";

const SignUp = () => {
  return (
    <AuthForm
      formType={EFormType.SIGN_UP}
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;
