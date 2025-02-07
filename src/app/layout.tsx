import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Components
import Footer from "@/components/layout/footer";
import Navigation from "@/components/layout/navbar";
import Provider from "./provider";

// const inter = Inter({ subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rozan Portfolio",
  description: "Rozan Ghosani's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={plusJakartaSans.className + " relative bg-neutral-800"}>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
