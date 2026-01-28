
import { GoogleGenAI, Type } from "@google/genai";
import { Lead } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const qualifyLeadAI = async (lead: Partial<Lead>) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a sales analyst. 
    Analyze this new lead: 
    Name: ${lead.name}
    Phone: ${lead.phone_number}
    Source: ${lead.source}
    
    Assign a lead score from 1-10, summarize their likely intent based on the channel, and suggest a next action.
    Do not invent personal data. Return as structured text.`,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                ai_score: { type: Type.INTEGER },
                ai_summary: { type: Type.STRING },
                suggested_action: { type: Type.STRING }
            },
            required: ["ai_score", "ai_summary", "suggested_action"]
        }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI parse error", e);
    return null;
  }
};

export const summarizeDashboardAI = async (stats: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize today's sales performance based on these metrics: ${JSON.stringify(stats)}. 
    Highlight bottlenecks, top channels, and provide a narrative summary.
    Do not recalculate numbers. Do not hallucinate counts. Be concise.`,
  });
  return response.text;
};

export const suggestNextActionAI = async (lead: Lead) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Given the lead history and notes: ${JSON.stringify(lead.notes)}, 
    and current status: ${lead.status}, suggest the single best next action to move them to the next stage in the pipeline.`,
  });
  return response.text;
};
