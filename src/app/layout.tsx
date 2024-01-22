import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"], weight: ["200", "300", "400", "500", "700"] });
const domain = process.env.DOMAIN ?? "https://weather.spyna.it/";
const protocol = process.env.PROTOCOL ?? "https";

const title = "Weather app";
const description =
  "Yet another shitty weather app, but in pink";
const image = `${protocol}://${domain}/spyna-weather.png`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [image],
    title,
    description,
    siteName: title,
    type: "website",
  },
  manifest: "/assets/site.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/assets/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
}
