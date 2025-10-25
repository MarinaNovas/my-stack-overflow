interface ITag {
  _id: string;
  name: string;
}

interface IAuthor {
  _id: string;
  name: string;
  image: string;
}

interface IQuestion {
  _id: string;
  title: string;
  content: string;
  tags: ITag[];
  author: IAuthor;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

/**
 params: /questions/[id] - Параметры, к которым можно получить доступ, задав вопрос с косой чертой, открывают доступ к динамическому параметру ID, 
searchParams: /questions?tag=javascript  параметры поиска указываются после вопросительного знака там, где вы указываете пару «ключ-значение», например tag, равен JavaScript.
**/

interface IPaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}
