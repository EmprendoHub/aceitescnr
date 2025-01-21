import { NextResponse } from "next/server";

export const POST = async (request) => {
  const data = await request.json();
  console.log(data, "data");
  try {
    return data;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Translation error",
      },
      { status: 500 }
    );
  }
};
