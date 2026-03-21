import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibhor Bansal | Data Engineer – Scalable Data Systems & Cloud Pipelines",
  description:
    "Portfolio of Vibhor Bansal – Results-driven Data Engineer with 5+ years of experience in Azure, AWS, Snowflake, Kafka, Airflow, and building scalable, cost-efficient data pipelines.",
  keywords: [
    "Data Engineer",
    "Vibhor Bansal",
    "Azure",
    "AWS",
    "Snowflake",
    "Kafka",
    "Airflow",
    "Data Pipeline",
    "ETL",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
