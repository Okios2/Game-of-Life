import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <h1>Conway's Game of Life</h1>
          <nav className="nav">
            <Link href="/">Home</Link>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <p>An internship project on githhub pages</p>
        </footer>
      </body>
    </html>
  );
}
