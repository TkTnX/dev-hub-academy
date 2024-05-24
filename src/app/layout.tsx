import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dev Hub Academy | Запоминай, повторяй",
  description: "Проходите тесты по frontend на сайте!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <Header />
        <main className="mt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
