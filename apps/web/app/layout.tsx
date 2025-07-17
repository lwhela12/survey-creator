import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Warren - Your Gateway to Student Voice Insights",
  description: "Educational survey platform for gathering student feedback through conversational burrows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav style={{ backgroundColor: 'var(--warren-light-gray)', borderBottom: '1px solid var(--warren-border)' }}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="warren-section-header text-xl font-bold" style={{ color: 'var(--warren-primary-dark-blue)' }}>
                🐰 Warren
              </Link>
              <div className="flex space-x-6">
                <Link href="/survey" className="warren-body-text font-medium hover:font-bold transition-all" style={{ color: 'var(--warren-primary-text)' }}>
                  The Den
                </Link>
                <Link href="/builder" className="warren-body-text font-medium hover:font-bold transition-all" style={{ color: 'var(--warren-primary-text)' }}>
                  Burrow Builder
                </Link>
                <Link href="/style" className="warren-body-text font-medium hover:font-bold transition-all" style={{ color: 'var(--warren-primary-text)' }}>
                  Warren Style
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
