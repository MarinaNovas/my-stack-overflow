"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { EMPTY_CHAR } from "@/constans/consts";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommeded", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || EMPTY_CHAR;
  const [active, setActive] = useState<string>(filterParams);
  const handleTypeClick = (filter: string) => {
    if (filter === active) {
      setActive(EMPTY_CHAR);
    } else {
      setActive(filter);
    }
  };

  useEffect(() => {
    let newUrl = EMPTY_CHAR;
    if (active) {
      newUrl = formUrlQuery({ params: searchParams.toString(), key: "filter", value: active });
    } else {
      newUrl = removeKeysFromUrlQuery({ params: searchParams.toString(), keysToRemove: ["filter"] });
    }
    router.push(newUrl, { scroll: false });
  }, [active, router, searchParams]);

  return (
    <div className="mt-10 hidden sm:flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Button
          onClick={() => handleTypeClick(filter.value)}
          key={filter.name}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none cursor-pointer`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
