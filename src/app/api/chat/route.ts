// FILE: src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        { error: "API key is not configured." },
        { status: 500 }
      );
    }

    const { history } = await req.json();

    if (!Array.isArray(history) || history.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty chat history provided." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const lastUserMessage = history[history.length - 1];
    const prompt = lastUserMessage?.parts[0]?.text;

    if (lastUserMessage?.role !== 'user' || typeof prompt !== 'string') {
        return NextResponse.json(
            { error: "Invalid prompt or last message format." },
            { status: 400 }
        );
    }

  
    const historyForApi = history.slice(1, -1);

    const chat = model.startChat({
      history: historyForApi,
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ response: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from Gemini API." },
      { status: 500 }
    );
  }
}
