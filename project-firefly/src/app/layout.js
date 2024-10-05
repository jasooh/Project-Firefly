import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "PROJECT: Firefly",
    description: "Project Firefly - developed during HTV 9",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={`dark`}>
                <Navbar/>
                {children}
            </body>
        </html>
    );
}
