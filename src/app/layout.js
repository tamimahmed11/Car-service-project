import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Doctor",
    template: "%s | Car Doctor",
  },
  description: "Car Reaper Workshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="carDoctorTheme">
      <body className={inter.className}>
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
