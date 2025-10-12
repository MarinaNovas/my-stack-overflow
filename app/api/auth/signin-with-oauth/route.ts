// import mongoose from "mongoose";

import dbConnect from "@/lib/mongoose";

export async function POST(/* request: Request */) {
  // const { provider, providerAccountId, user } = await request.json();
  // const session = await mongoose.startSession();

  await dbConnect();
}
