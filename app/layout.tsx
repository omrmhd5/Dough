import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Montserrat, Alexandria } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/dough/scroll-to-top";
import { ScrollToTopOnLoad } from "@/components/dough/scroll-to-top-on-load";
import { InitialPageLoader } from "@/components/dough/initial-page-loader";
import { NavigationLoader } from "@/components/dough/navigation-loader";
import { LocaleProvider } from "@/components/providers/locale-provider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "dough — where ideas take shapes",
  description:
    "Dough is a creative agency shaping brands, stories, and moments from scratch.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${alexandria.variable} bg-background`}
      suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;}catch(e){}})();`,
          }}
        />
        <LocaleProvider>
          <ScrollToTopOnLoad />
          <InitialPageLoader>{children}</InitialPageLoader>
          <NavigationLoader />
          <ScrollToTop />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </LocaleProvider>
      </body>
    </html>
  );
}
