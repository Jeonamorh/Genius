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
    const { prompt, amount = 1, resolution = "512x512" } = body;
    const isPro = await checkSubscription();

    if (!userId)
      return new NextResponse("You are not logged in", { status: 401 });
    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution is required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      incrementApiLimits();
    }
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[Imageerror]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
