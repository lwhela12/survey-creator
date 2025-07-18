import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Sidebar from "./components/Sidebar";
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
  title: "Survey Creator - Student Voice Platform",
  description: "Create engaging conversational surveys for gathering meaningful student feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 md:ml-64">
            <main className="min-h-screen">
              {children}
            </main>

            {/* Minimal Footer */}
            <footer className="border-t mt-16 bg-white">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      © 2025 Warren by Nesolagus
                    </span>
                  </div>
                  
                  <div className="flex gap-6">
                    <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Privacy
                    </Link>
                    <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Terms
                    </Link>
                    <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      Documentation
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
