"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

import { EProvider, TProvider } from "@/constans/consts";
import ROUTES from "@/constans/routes";

import { Button } from "../ui/button";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light900 rounded-2 min-h-12 flex-1 px-4 py-3.5";
  const handleSignIn = async (provider: TProvider) => {
    try {
      await signIn(provider, { redirectTo: ROUTES.HOME });
    } catch (error) {
      toast.error("Sign-in Faild", {
        description: error instanceof Error ? error.message : "An error during sign-in",
      });
    }
  };

  return (
    <div className="flex flex-wrap mt-10 gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn(EProvider.Github)}>
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors object-contain mr-2.5"
        />
        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn(EProvider.Google)}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="object-contain mr-2.5"
          onClick={() => handleSignIn(EProvider.Google)}
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
