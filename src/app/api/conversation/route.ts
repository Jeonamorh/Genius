import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { incrementApiLimits, checkApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI();
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    const isPro = await checkSubscription();
    if (!userId)
      return new NextResponse("You are not logged in", { status: 401 });
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (!isPro) {
      incrementApiLimits();
    }
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("[Conversation error]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
