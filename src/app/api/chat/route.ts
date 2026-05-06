import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a friendly and professional HVAC service assistant for "Austin HVAC Pros". 
Your job is to:
1. Respond to customer inquiries about HVAC services
2. Qualify leads by asking about their issue
3. Provide pricing estimates
4. Book appointments

Services and pricing:
- AC Repair: $89 diagnostic fee (applied to repair cost)
- AC Installation: Starting at $3,000
- Furnace Repair: $89 diagnostic fee
- Duct Cleaning: $400-$800 depending on home size
- Annual Maintenance: $250/year per unit
- Smart Thermostat Installation: $150 labor (device not included) or $350-$450 with thermostat

Business hours: Monday-Friday 8am-6pm, Saturday 9am-2pm
Emergency service available 24/7 (additional $150 after-hours fee)
Service area: Austin, TX metro area

Always be helpful, empathetic, and try to schedule an appointment. Ask for their name, address, and preferred date/time when booking.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: ChatMessage[] };

  const openaiKey = process.env.OPENAI_API_KEY;

  if (openaiKey) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      return NextResponse.json({
        message: data.choices?.[0]?.message?.content || getFallbackResponse(messages),
      });
    } catch {
      return NextResponse.json({ message: getFallbackResponse(messages) });
    }
  }

  return NextResponse.json({ message: getFallbackResponse(messages) });
}

function getFallbackResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

  if (
    lastMessage.includes("price") ||
    lastMessage.includes("cost") ||
    lastMessage.includes("how much")
  ) {
    return "Great question! Here are our standard rates:\n\n- AC/Furnace Diagnostic: $89 (applied to repair)\n- AC Installation: Starting at $3,000\n- Duct Cleaning: $400-$800\n- Annual Maintenance: $250/unit\n- Thermostat Install: $150 labor\n\nWould you like to schedule a service? I just need your name, address, and preferred date/time.";
  }

  if (
    lastMessage.includes("book") ||
    lastMessage.includes("schedule") ||
    lastMessage.includes("appointment")
  ) {
    return "I'd love to help you book an appointment! To get you scheduled, I'll need:\n\n1. Your full name\n2. Service address\n3. Preferred date and time\n4. Brief description of the issue\n\nWe have availability this week. What works best for you?";
  }

  if (
    lastMessage.includes("ac") ||
    lastMessage.includes("air condition") ||
    lastMessage.includes("cooling") ||
    lastMessage.includes("not cool")
  ) {
    return "I'm sorry to hear about your AC issues! A few common causes include low refrigerant, a dirty filter, or a compressor problem. Our diagnostic fee is $89, which gets applied to the repair cost if you proceed.\n\nWould you like to schedule a technician to come take a look? We can usually get someone out within 24-48 hours.";
  }

  if (
    lastMessage.includes("heat") ||
    lastMessage.includes("furnace") ||
    lastMessage.includes("warm")
  ) {
    return "I understand how uncomfortable heating issues can be! Common furnace problems include pilot light issues, thermostat malfunctions, or filter blockages.\n\nOur diagnostic fee is $89 (applied to repair costs). Would you like me to schedule a technician visit?";
  }

  if (
    lastMessage.includes("emergency") ||
    lastMessage.includes("urgent")
  ) {
    return "We offer 24/7 emergency HVAC service! There is a $150 after-hours fee in addition to the standard diagnostic rate. A technician can typically be at your location within 2 hours.\n\nWould you like me to dispatch an emergency technician right away? I'll need your name and address.";
  }

  if (
    lastMessage.includes("thank") ||
    lastMessage.includes("thanks")
  ) {
    return "You're welcome! Don't hesitate to reach out if you need anything else. We're here to keep you comfortable! Have a great day.";
  }

  return "Thanks for reaching out to Austin HVAC Pros! I can help you with:\n\n- AC repair & installation\n- Furnace repair\n- Duct cleaning\n- Annual maintenance plans\n- Smart thermostat installation\n\nWhat can I help you with today?";
}
