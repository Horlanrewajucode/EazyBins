import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/subscribe", async ({ request }) => {
    const data = await request.json();

    console.log("Received subscription:", data);

    // Simulate server delay
    await new Promise((res) => setTimeout(res, 1200));

    if (!data.fullName || !data.email || !data.plan) {
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        message: "Subscription successful",
        reference:
          "TXN-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
      },
      { status: 200 }
    );
  }),
];
