import { Metadata } from "next";
import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import HomeFilter from "@/components/filters/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { EMPTY_CHAR } from "@/constans/consts";
import { HomePageFilters } from "@/constans/filter";
import ROUTES from "@/constans/routes";
import { EMPTY_QUESTION } from "@/constans/state";
import { getQuestions } from "@/lib/actions/question.action";

export const metadata: Metadata = {
  title: "Dev Overflow | Home",
  description: "Discover different programming questions and answers with recommendations from the community.",
  icons: {
    icon: "/icons/favicon.svg", // default favicon for browsers
    shortcut: "/icons/favicon-shortcut.png", // sometimes used for pinned tabs or bookmarks
    apple: "/icons/apple-icon.png", // required by iOS when users add your site to their home screen
  },
};

interface ISearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: ISearchParams) => {
  const { query = EMPTY_CHAR, filter = EMPTY_CHAR, page, pageSize } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });
  const { questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[45px] min-w-[173] px-4 py-3 !text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTION}>Ask a Qestion</Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.HOME}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
          iconPosition="left"
        />
        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      <HomeFilter />
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions?.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Home;
