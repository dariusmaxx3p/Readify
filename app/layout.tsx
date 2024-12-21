import { Geist, Geist_Mono, Funnel_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${funnelDisplay.variable} bg-brilliant`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
