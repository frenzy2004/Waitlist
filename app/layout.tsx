import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BizLocate - Join the Waitlist",
  description: "Finding the best location for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
