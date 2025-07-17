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

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center text-lg">
                    🐰
                  </div>
                  <span className="warren-section-header text-xl m-0" style={{ color: 'var(--warren-primary-dark-blue)' }}>
                    Warren
                  </span>
                </div>
                <p className="warren-body-text mb-4 max-w-md" style={{ color: 'var(--warren-secondary-text)' }}>
                  Transforming how educators gather student feedback through engaging conversational burrows. 
                  Every student voice matters.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200">
                    📧
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200">
                    🐦
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200">
                    💼
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="warren-body-text font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/builder" className="warren-secondary-text hover:text-blue-600 transition-colors">Burrow Builder</Link></li>
                  <li><Link href="/style" className="warren-secondary-text hover:text-blue-600 transition-colors">Warren Style</Link></li>
                  <li><Link href="/survey" className="warren-secondary-text hover:text-blue-600 transition-colors">The Den</Link></li>
                  <li><Link href="/analytics" className="warren-secondary-text hover:text-blue-600 transition-colors">Analytics</Link></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 className="warren-body-text font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><Link href="/docs" className="warren-secondary-text hover:text-blue-600 transition-colors">Documentation</Link></li>
                  <li><Link href="/help" className="warren-secondary-text hover:text-blue-600 transition-colors">Help Center</Link></li>
                  <li><Link href="/community" className="warren-secondary-text hover:text-blue-600 transition-colors">Community</Link></li>
                  <li><Link href="/contact" className="warren-secondary-text hover:text-blue-600 transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="warren-secondary-text text-sm">
                © 2025 Warren Education. All rights reserved. Made with 🐰 for educators.
              </div>
              <div className="flex gap-6">
                <Link href="/privacy" className="warren-secondary-text text-sm hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="warren-secondary-text text-sm hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="warren-secondary-text text-sm hover:text-blue-600 transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
