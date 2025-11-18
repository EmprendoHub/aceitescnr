import { NextResponse } from "next/server";

// Simple password verification endpoint
// In production, you might want to use a more secure method
const FICHAS_PASSWORD = process.env.FICHAS_PASSWORD || "fichas2025";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    if (password === FICHAS_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: "Access granted",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
