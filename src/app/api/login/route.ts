// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { message: "Email and password are required." },
//         { status: 400 }
//       );
//     }

//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const MOCK_USER_EMAIL = "user@example.com";
//     const MOCK_USER_PASSWORD = "password123";

//     if (email === MOCK_USER_EMAIL && password === MOCK_USER_PASSWORD) {
//       return NextResponse.json(
//         { message: "Login successful" },
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error("Login API error:", error);
//     return NextResponse.json(
//       { message: "An internal server error occurred." },
//       { status: 500 }
//     );
//   }
// }




// app/api/login/route.ts
import  prisma  from "../../../../lib/prisma";
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
