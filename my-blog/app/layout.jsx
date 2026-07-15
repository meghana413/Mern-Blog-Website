import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "BlogHub",
  description: "A Blogging Platform",
};

function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
