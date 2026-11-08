import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WelcomePopup from "@/components/WelcomePopup";

const sora = Sora({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalexpert.pk"),
  title: {
    default: "DigitalExpert | Digital Marketing Agency & Training Institute in Bahawalpur",
    template: "%s | DigitalExpert",
  },
  description:
    "Grow your brand and master digital skills with DigitalExpert. Professional WordPress development, SEO, paid ads, social media marketing, and hands-on IT training at University Chowk, Bahawalpur.",
  keywords: [
    "Digital Marketing Agency Bahawalpur",
    "Digital Marketing Courses Bahawalpur",
    "WordPress Course Bahawalpur",
    "SEO Agency Pakistan",
    "Social Media Marketing",
    "Google Ads Pakistan",
    "TikTok Ads Agency",
    "Khezar Hayat",
    "DigitalExpert",
    "University Chowk, Bahawalpur",
  ],
  authors: [{ name: "Khezar Hayat", url: "https://digitalexpert.pk" }],
  creator: "DigitalExpert",
  publisher: "DigitalExpert",
  openGraph: {
    title: "DigitalExpert | Grow Your Brand. Master Digital Skills.",
    description: "Digital Marketing Agency & IT Training Institute based at University Chowk, Bahawalpur. Serving 300+ clients across UAE, KSA, UK & Pakistan.",
    url: "https://digitalexpert.pk",
    siteName: "DigitalExpert",
    images: [
      {
        url: "/brand/digital-marketing-workspace.png",
        width: 1200,
        height: 630,
        alt: "DigitalExpert - Digital Marketing Agency & Academy",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalExpert | Digital Marketing Agency & Academy",
    description: "Grow your brand and master in-demand digital skills in Bahawalpur.",
    images: ["/brand/digital-marketing-workspace.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/favicon.png",
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
    <html lang="en" className={`${sora.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased bg-white text-de-body min-h-screen flex flex-col">
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <WelcomePopup />
      </body>
    </html>
  );
}
