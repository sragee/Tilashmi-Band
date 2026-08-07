import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().or(z.literal("")),
  subject: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { name, email, phone, subject, message } = parsed.data;

  await prisma.contactMessage.create({
    data: { name, email, phone: phone || null, subject: subject || null, message },
  });

  return NextResponse.json({ success: true });
}
