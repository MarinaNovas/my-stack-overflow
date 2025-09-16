import { User } from "lucide-react";
import { NextResponse } from "next/server";

import handlerError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handlerError(error, "api") as APIErrorResponse;
  }
}

// Create User
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
  } catch (error) {
    return handlerError(error, "api") as APIErrorResponse;
  }
}
