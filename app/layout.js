import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScheduleProvider } from "@/context/ScheduleContext";
import ScheduleSidebar from "./components/ScheduleSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tech Conferences",
  description: "Personalized Dashboard for Tech Conferences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScheduleProvider>
          {children}
          <ScheduleSidebar />
        </ScheduleProvider>
      </body>
    </html>
  );
}
