"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constans";
import { cn } from "@/lib/utils";

interface INavLinks {
  isMobileNav?: boolean;
  userId?: string;
}

const NavLinks = ({ isMobileNav = false, userId }: INavLinks) => {
  const pathname = usePathname();
  return (
    <>
      {sidebarLinks.map((item) => {
        const route = item.route === "/profile" ? (userId ? `/profile/${userId}` : null) : item.route;

        if (!route) return null;
        const isActive = (pathname.includes(route) && route.length > 1) || pathname === route;

        const LinkComponent = (
          <Link
            href={route}
            key={item.label}
            className={cn(
              isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p className={cn(isActive ? "base-bold" : "base-medium", !isMobileNav && "max-lg:hidden")}>{item.label}</p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
