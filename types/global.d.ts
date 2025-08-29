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
  tags: ITag[];
  author: IAuthor;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}
