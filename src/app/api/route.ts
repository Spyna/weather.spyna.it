export const dynamic = "force-dynamic"; // defaults to auto
import { request } from "undici";
import { createClient } from "@/utils/supabase/server";
import { Forecast } from "@/types/Entities";
import dayjs from "dayjs";

function getUserIP(req: Request): string {
  // Try different headers for IP address
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  const cfConnectingIP = req.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Fallback to a default location if no IP can be determined
  return "auto:ip";
}

export async function GET(req: Request) {
  const key = process.env.WEATHER_API_KEY;
  const { searchParams } = new URL(req.url);
  let query = searchParams.get("query");

  if (!query || query.trim() === "") {
    query = getUserIP(req);
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("forecast")
    .select()
    .eq("location", query.toLowerCase())
    .limit(1)
    .single();

  const forecast: Forecast | null = data || null;

  if (isFresh(forecast)) {
    console.log(`Using cached forecast for [${query}] - created at (${forecast?.created_at})`);
    return Response.json(forecast!.forecast);
  }

  const { body } = await request(
    `http://api.weatherapi.com/v1/forecast.json?q=${query}&key=${key}&days=7&aqi=no&alerts=no`,
    {
      method: "GET",
    }
  );

  const response = await body.json();

  const { error } = await supabase
    .from("forecast")
    .insert({ location: query.toLowerCase(), forecast: response });

  if (error) {
    console.log("Error inserting forecast", error);
  }

  return Response.json(response);
}

function isFresh(forecast: Forecast | null): boolean {
  if (!forecast) {
    return false;
  }
  const sixHoursAgo = dayjs().subtract(6, "hour").toDate();
  return dayjs(forecast.created_at).isAfter(sixHoursAgo);
}
