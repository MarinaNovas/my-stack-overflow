import Link from "next/link";
import React from "react";

import ROUTES from "@/constans/routes";
import { getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface IProps {
  _id: string;
  name: string;
  questions: number;
  showCount?: boolean;
  compact?: boolean;
}
const TagCard = ({ _id, name, questions, showCount, compact }: IProps) => {
  const iconClass = getDeviconClassName(name);
  return (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between space-x-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center gap-2">
          <i className={iconClass}></i>
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && <p className="small-medium text-dark500_light700">{questions}</p>}
    </Link>
  );
};

export default TagCard;
