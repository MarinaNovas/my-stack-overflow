import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import { EMPTY_CHAR } from "@/constans/consts";
import ROUTES from "@/constans/routes";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";

const Navbar = async () => {
  const session = await auth();
  const { id: userId, name, image } = session?.user || {};
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5  p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" width={23} height={23} alt="MyStackFlow Logo" />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <Theme />
        {userId && <UserAvatar id={userId} name={name || EMPTY_CHAR} imageUrl={image} />}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
