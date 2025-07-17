import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import NavBar from "./components/NavBar";
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
        {/* Enhanced Navigation */}
        <NavBar />

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Minimal Footer */}
        <footer className="border-t mt-16" style={{ borderColor: 'var(--warren-border)', background: 'var(--warren-page-background)' }}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4">
                  <img 
                    src="/NesolagusLogo.png" 
                    alt="Nesolagus Logo" 
                    className="w-4 h-4 object-contain"
                    style={{ width: '16px', height: '16px' }}
                  />
                </div>
                <span className="warren-body-text font-semibold" style={{ color: 'var(--warren-primary-dark-blue)' }}>
                  Warren
                </span>
                <span className="warren-secondary-text text-sm">
                  powered by Nesolagus
                </span>
              </div>
              
              <div className="flex gap-6">
                <Link href="/privacy" className="warren-secondary-text text-sm hover:text-blue-600 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="warren-secondary-text text-sm hover:text-blue-600 transition-colors">
                  Terms
                </Link>
                <Link href="/docs" className="warren-secondary-text text-sm hover:text-blue-600 transition-colors">
                  Docs
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
