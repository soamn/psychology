import type { Metadata } from "next";
import "./globals.css";
import TopHeader from "@/components/topheader";

export const metadata: Metadata = {
  metadataBase: new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/opengraph-image.png`
  ),
  applicationName: "Indian Psychology",
  publisher: "Aman Negi",
  title: {
    default: "Indian Psychology",
    template: "%s | Indian Psychology",
  },
  description:
    " Dive into the rich tapestry of Indian psychology – exploring ancient wisdom, modern research, and practical insights to nurture mental well-being, personal growth, and self-discovery.",
  openGraph: {
    title: "Indian Psychology",
    description:
      " Dive into the rich tapestry of Indian psychology – exploring ancient wisdom, modern research, and practical insights to nurture mental well-being, personal growth, and self-discovery.",
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: "Indian Psychology",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Indian Psychology",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  twitter: {
    card: "summary_large_image",
    description:
      " Dive into the rich tapestry of Indian psychology – exploring ancient wisdom, modern research, and practical insights to nurture mental well-being, personal growth, and self-discovery.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" antialiased bg-fuchsia-100 ">
        <TopHeader />
        {children}
      </body>
    </html>
  );
}
