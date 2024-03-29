import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { incrementApiLimits, checkApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    const isPro = await checkSubscription();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired", { status: 403 });
    const output = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    if (!isPro) {
      incrementApiLimits();
    }
    return NextResponse.json(output);
  } catch (error) {
    console.log("[MUSIC ERROR]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
