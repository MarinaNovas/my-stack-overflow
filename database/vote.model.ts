import { model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId;
  id: Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

const VoteSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", reqired: true },
    id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["question", "answer"], reqired: true },
    voteTpe: { type: String, enum: ["upvote", "downvote"], reqired: true },
  },
  { timestamps: true }
);

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);
export default Vote;
