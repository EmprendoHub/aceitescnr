import Analytic from "@/backend/models/Analytic";
import Visitor from "@/backend/models/Visitor";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to log time spent
const logTimeSpent = (label, startTime) => {
  const endTime = performance.now();
  console.log(`${label}: ${endTime - startTime} ms`);
};

export const POST = async (request) => {
  const { event, source, country, ip, viewport, browserName, device } =
    await request.json();
  try {
    await dbConnect();
    // Get the current UTC date and time
    const currentDate = new Date();
    const cstOffsetHours = -6;

    let today = new Date(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds()
    );

    today.setHours(currentDate.getHours() + cstOffsetHours);
    today.setUTCHours(0, 0, 0, 0);

    // Efficiently find or create Analytic document
    let startTime = performance.now();
    let dayAnalytics = await Analytic.findOneAndUpdate(
      { createdAt: today, "source.page": source },
      {
        $setOnInsert: {
          createdAt: new Date(),
          source: [{ page: source, visits: 1 }],
        },
      },
      { upsert: true, new: true }
    );

    if (!dayAnalytics.source.some((s) => s.page === source)) {
      dayAnalytics.source.push({ page: source, visits: 1 });
    } else {
      dayAnalytics.source.forEach((s) => {
        if (s.page === source) {
          s.visits++;
        }
      });
    }
    dayAnalytics.save();

    // Efficiently find or create Visitor document
    let visitor = await Visitor.findOneAndUpdate(
      { ip: ip },
      {
        $setOnInsert: {
          ip,
          country,
          actions: [
            {
              name: event,
              source: source,
              date: today,
              viewport: viewport,
              browser: browserName,
              device: device,
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    let actionExists = false;
    visitor.actions.forEach((action) => {
      if (
        action.name === event &&
        action.source === source &&
        action.date.toDateString() === today.toDateString()
      ) {
        action.visits++;
        actionExists = true;
      }
    });

    if (!actionExists) {
      visitor.actions.push({
        name: event,
        source: source,
        date: today,
        viewport: viewport,
        browser: browserName,
        device: device,
      });
    }

    visitor.updatedAt = new Date();
    visitor.save();
    logTimeSpent("Set Analytics:", startTime);
    const response = NextResponse.json({
      message: "Tracked successfully",
      success: true,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Analytics error",
      },
      { status: 500 }
    );
  }
};
