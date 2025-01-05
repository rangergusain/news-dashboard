import Navbar from "./components/layout/Navbar";
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "A responsive dashboard",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex">
        <nav className="w-60 bg-gray-800 text-white h-full">
          <Navbar />
        </nav>
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
