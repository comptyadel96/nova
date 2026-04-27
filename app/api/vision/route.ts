import { NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("La clé OPENAI_API_KEY n'est pas configurée.");
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const photo = formData.get("photo");

  if (!photo || !(photo instanceof File)) {
    return NextResponse.json(
      { error: "Fichier photo manquant ou invalide." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await photo.arrayBuffer());
  const dataUrl = `data:${photo.type};base64,${buffer.toString("base64")}`;
  const prompt = `Analyse l'image ci-jointe et reponds uniquement avec un JSON valide contenant deux champs :\n` +
    `- interventionType : type d'intervention plomberie (ex: "fuite d'eau", "debouchage", "remplacement de chauffe-eau")\n` +
    `- estimate : estimation de prix en euros, sans autre texte (ex: "120EUR")\n` +
    `Ne fournis aucune explication suplementaire.`;

  try {
    const openai = getOpenAIClient();
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            {
              type: "input_image",
              image_url: dataUrl,
              detail: "auto",
            },
          ],
        },
      ],
    });

    const outputText = response.output_text;

    if (!outputText) {
      return NextResponse.json(
        {
          error: "Aucune reponse textuelle recue de l'API OpenAI.",
        },
        { status: 500 },
      );
    }

    let parsed: { interventionType: string; estimate: string };

    try {
      parsed = JSON.parse(outputText.trim());
    } catch {
      return NextResponse.json(
        {
          error: "Impossible de parser la reponse de l'API OpenAI.",
          raw: outputText,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue pendant l'appel OpenAI.",
      },
      { status: 500 },
    );
  }
}
