import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLoggedInUser } from "@/actions/loginActions/getLoggedInUser";
import { Header } from "@/components/common/header";
import { MyContextProvider } from "./context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V-GROUPING App",
  description: "バレーボールのチーム管理アプリ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  const isLoggedIn: boolean = !!user;
  const dataToPass: { user_state: boolean } = { user_state: isLoggedIn };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-white min-h-full flex flex-col">
        <Header user_state={isLoggedIn} />
        <MyContextProvider value={dataToPass}>
          {children}
        </MyContextProvider>
      </body>
    </html>
  );
}
