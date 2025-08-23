import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techMap } from "@/constans/techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isOdd = (num: number): boolean => !!(num % 2);
export const getDeviconClassName = (techName: string) => {
  const normolizeTechName = techName.replace(/[ .]/g, "").toLocaleLowerCase();
  return techMap[normolizeTechName] ? `${techMap[normolizeTechName]} colored` : "devicon-devicon-plain";
};
