import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const sql = neon(process.env.DATABASE_URL);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // basic validation
    if (!name || !email || !message) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    // ✅ 1. Save to Neon (your existing feature)
    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    // ✅ 2. Send email via Resend (new feature)
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // default testing sender
      to: ["pranav52.patel@gmail.com"], // change to your email
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}