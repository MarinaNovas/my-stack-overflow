import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { EMPTY_CHAR } from "@/constans/consts";
import ROUTES from "@/constans/routes";
import { getQuestions } from "@/lib/actions/question.action";

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
  const { questions } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[45px] min-w-[173] px-4 py-3 !text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTION}>Ask a Qestion</Link>
        </Button>
      </section>
      <section className="mt-10">
        <LocalSearch route="/" imgSrc="/icons/search.svg" placeholder="Search questions..." otherClasses="flex-1" />
      </section>
      <HomeFilter />
      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions?.length > 0 ? (
            questions?.map((question) => <QuestionCard key={question._id} question={question} />)
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">{error?.message || "Failed to fetch questions"}</p>
        </div>
      )}
    </>
  );
};

export default Home;
