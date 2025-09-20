import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handlerError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return NextResponse.json({ success: true, data: accounts }, { status: 200 });
  } catch (error) {
    return handlerError(error, "api") as APIErrorResponse;
  }
}

// Create User
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedDate = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validatedDate.provider,
      providerAccountId: validatedDate.providerAccountId,
    });
    if (existingAccount) throw new ForbiddenError("An account with the same provider already exists");

    const newAccount = await Account.create(validatedDate);
    return NextResponse.json({ success: true, data: newAccount }, { status: 201 });
  } catch (error) {
    return handlerError(error, "api") as APIErrorResponse;
  }
}
