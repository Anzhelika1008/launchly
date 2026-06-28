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
You are a world-class startup brand designer.

Return ONLY valid JSON. No markdown. No explanation.

Use this exact JSON structure:
{
  "name": "Brand name",
  "tagline": "Short tagline",
  "style": "Short brand style description",
  "colors": [
    { "name": "Color name", "hex": "#000000" },
    { "name": "Color name", "hex": "#FFFFFF" },
    { "name": "Color name", "hex": "#8B5CF6" }
  ],
  "logoIdea": "Short logo concept",
  "landingPage": {
    "headline": "Landing page headline",
    "subheadline": "Landing page subheadline",
    "cta": "Call to action"
  },
  "instagramBio": "Short Instagram bio",
  "marketingHooks": [
    "Hook one",
    "Hook two",
    "Hook three"
  ]
}
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