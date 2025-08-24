"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { EMPTY_CHAR } from "@/constans/consts";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import { Input } from "../ui/input";

interface ILocalSearch {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}
const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: ILocalSearch) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || EMPTY_CHAR;
  const [searchQuery, setSearchQuery] = useState(query);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({ params: searchParams.toString(), key: "query", value: searchQuery });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({ params: searchParams.toString(), keysToRemove: ["query"] });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, route, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image src={imgSrc} alt="Search" width={24} height={24} className="cursor-pointer" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none outline-none shadow-none"
      />
    </div>
  );
};

export default LocalSearch;
