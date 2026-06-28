import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are a world-class startup branding expert.

Generate:
# Startup Name
# Tagline
# Brand Style
# Color Palette
# Logo Idea
# Landing Page Copy
# Social Media Bio
# Three Marketing Hooks

Be creative, premium and clear.
`,
        },
        {
          role: "user",
          content: `Create a brand concept for this startup idea: ${prompt}`,
        },
      ],
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}