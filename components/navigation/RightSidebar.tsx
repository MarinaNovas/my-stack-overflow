import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constans/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.actions";
import { isOdd } from "@/lib/utils";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const { success: tagSuccess, data: tags, error: tagError } = await getTopTags();

  return (
    <section className="flex flex-col gap-6 custom-scroll overflow-y-auto h-screen w-[350px] px-6 pt-36 pb-6 max-xl:hidden background-light900_dark200 light-border sticky top-0 right-0 border-l">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Question</h3>
        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map(({ _id, title }, idx) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <Image
                    src={isOdd(idx) ? "/icons/question_blue.svg" : "/icons/question_orange.svg"}
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                  <p className="body-medium text-dark500_light700 line-clamp-2">{title}</p>
                </Link>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <DataRenderer
          data={tags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          success={tagSuccess}
          error={tagError}
          render={(tags) => (
            <div className="mt-7 flex flex-col gap-4">
              {tags.map(({ _id, name, questions }) => (
                <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
