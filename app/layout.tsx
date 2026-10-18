import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Montserrat, Alexandria } from "next/font/google";
import "./globals.css";
import { ScrollToTopOnLoad } from "@/components/dough/scroll-to-top-on-load";
import { LocaleProvider } from "@/components/providers/locale-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://doughx.vercel.app"),
  title: {
    default: "Dough — where ideas take shape",
    template: "%s — Dough",
  },
  description:
    "Dough is a Cairo creative agency shaping brands, stories, and moments from scratch: strategy, identity, content, packaging and spaces.",
  openGraph: {
    title: "Dough — where ideas take shape",
    description:
      "A Cairo creative agency shaping brands, stories, and moments from scratch.",
    images: ["/profile/v3/n2-0.webp"],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fffcf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${alexandria.variable}`}
      suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LocaleProvider>
          <ScrollToTopOnLoad />
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </LocaleProvider>
      </body>
    </html>
  );
}
