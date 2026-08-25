import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AccountProvider } from "@/lib/account-context";
import { SavedItemsProvider } from "@/lib/saved-items-context";
import GlobalBackground3D from "@/components/GlobalBackground3D";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

const SITE_URL = "https://defabiano.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "De Fabiano Bespoke Tailor | Custom Suits, Bangkok",
    template: "%s | De Fabiano Bespoke Tailor",
  },
  description:
    "Bespoke suits, shirts, and formalwear made to measure in Bangkok since 2008. Book a fitting on Sukhumvit Road or shop the collection online.",
  keywords: [
    "bespoke tailor Bangkok",
    "custom suit Bangkok",
    "made to measure suit Thailand",
    "Sukhumvit tailor",
    "bespoke shirts Bangkok",
  ],
  openGraph: {
    title: "De Fabiano Bespoke Tailor | Bangkok",
    description:
      "Bespoke suits, shirts, and formalwear made to measure in Bangkok since 2008.",
    url: SITE_URL,
    siteName: "De Fabiano Bespoke Tailor",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Fabiano Bespoke Tailor | Bangkok",
    description: "Bespoke suits, shirts, and formalwear made to measure in Bangkok since 2008.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} font-body antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <GlobalBackground3D />
        <AccountProvider>
          <SavedItemsProvider>
            <CartProvider>
              <Nav />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CartDrawer />
              <ChatWidget />
            </CartProvider>
          </SavedItemsProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
