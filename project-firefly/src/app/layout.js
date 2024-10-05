import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "PROJECT: Firefly",
  description: "Project Firefly - developed during HTV 9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`dark`}
      >
        {children}
      </body>
    </html>
  );
}
