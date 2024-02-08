export const dynamic = "force-dynamic"; // defaults to auto
import { request } from "undici";
import response from "./response.json";

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "development") {
    return Response.json(response);
  }
  const key = process.env.WEATHER_API_KEY;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const { body } = await request(
    `http://api.weatherapi.com/v1/forecast.json?q=${query}&key=${key}&days10&aqi=no&alerts=no`,
    {
      method: "GET",
    }
  );

  return Response.json(await body.json());
}
