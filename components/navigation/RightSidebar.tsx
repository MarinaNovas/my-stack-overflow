import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constans/routes";
import { isOdd } from "@/lib/utils";

import TagCard from "../cards/TagCard";

const hotQuestions = [
  { _id: "1", title: "How to create a custom hook in React?" },
  { _id: "2", title: "How to use React Query?" },
  { _id: "3", title: "How to use Redux?" },
  { _id: "4", title: "How to use React Router?" },
  { _id: "5", title: "How to use React Context?" },
];
const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "javascript", questions: 200 },
  { _id: "3", name: "typescript", questions: 150 },
  { _id: "4", name: "nextjs", questions: 50 },
  { _id: "5", name: "react-query", questions: 75 },
];

const RightSidebar = () => {
  return (
    <section className="flex flex-col gap-6 custom-scroll overflow-y-auto h-screen w-[350px] px-6 pt-36 pb-6 max-xl:hidden background-light900_dark200 light-border sticky top-0 right-0 border-l">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Question</h3>
        <div className="mt-7 flex flex-col w-full gap-[30px]">
          {hotQuestions.map((item, idx) => (
            <Link
              key={item._id}
              href={ROUTES.QUESTION(item._id)}
              className="cursor-pointer flex justify-between items-center gap-7"
            >
              <div className="flex justify-start items-center gap-2">
                <Image
                  src={isOdd(idx) ? "/icons/question_blue.svg" : "/icons/question_orange.svg"}
                  alt="Chevron"
                  width={20}
                  height={20}
                />
                <p className="body-medium text-dark500_light700">{item.title}</p>
              </div>
              <Image src="\icons\chevron-right.svg" alt="Chevron" width={20} height={20} className="invert-colors" />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col w-full gap-[30px]">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
