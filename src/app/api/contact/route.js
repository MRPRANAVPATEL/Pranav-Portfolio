import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // basic validation (don’t trust humans)
    if (!name || !email || !message) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    // insert into Neon DB
    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}