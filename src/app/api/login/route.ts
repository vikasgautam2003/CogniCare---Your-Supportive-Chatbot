

// app/api/login/route.ts
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email and password required" }, { status: 400 });
    }

    // find user in database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // compare password with hashed password in DB
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ success
    // later you’ll want JWT/session here, but for now return user
    return Response.json(
      { id: user.id, email: user.email, message: "Login successful" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
