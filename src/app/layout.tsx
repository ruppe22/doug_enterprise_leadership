import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <header className="site-header">
          <nav className="container site-nav" aria-label="Primary">
            <Link href="/" className="site-brand">
              {site.title}
            </Link>

            <div className="nav-links">
              <Link className="nav-link" href="/work">
                Work
              </Link>
              <Link className="nav-link" href="/thought-leadership">
                Thought Leadership
              </Link>
              <Link className="nav-link" href="/about">
                About
              </Link>
              <Link className="nav-link" href="/contact">
                Contact
              </Link>
            </div>
          </nav>
        </header>

        <main id="content">{children}</main>

        <footer className="site-footer">
          <div className="site-footer__inner">© {new Date().getFullYear()} {site.name}. Built for iteration.</div>
        </footer>
      </body>
    </html>
  );
}
