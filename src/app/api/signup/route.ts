// // app/api/signup/route.ts

// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { name, email, password } = await request.json();

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { message: "All fields are required." },
//         { status: 400 }
//       );
//     }
   
//     if (email === "existing@example.com") {
//       return NextResponse.json(
//         { message: "User with this email already exists." },
//         { status: 409 } // 409 Conflict
//       );
//     }

   
//     console.log("New user created:", { name, email });
    
//     return NextResponse.json(
//       { message: "User created successfully." },
//       { status: 201 } // 201 Created
//     );
//   } catch (error) {
//     console.error("Signup API error:", error);
//     return NextResponse.json(
//       { message: "An internal server error occurred." },
//       { status: 500 }
//     );
//   }
// }






// app/api/signup/route.ts
import  prisma  from "../../../../lib/prisma"; // Make sure the path is correct
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 1. Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // 2. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 4. Return a success response (don't send the password back)
    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email },
      { status: 201 } // 201 Created
    );
    
  } catch (error: any) {
    // 5. Handle specific errors, like a duplicate email
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 } // 409 Conflict
      );
    }

    // Handle any other unexpected errors
    console.error("Signup API error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}