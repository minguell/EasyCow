import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapClient from "../components/BootstrapClient.js";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CineIDE - G7",
  description: "Projeto CineIDE - Desenvolvido pelo Grupo 7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags adicionais aqui */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <BootstrapClient /> {/* Inclui BootstrapClient */}
      </body>
    </html>
  );
}