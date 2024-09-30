import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: `Esther Bayer`,
  description: `Work Samples Portfolio.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <footer id="contact" className="mt-20 bg-darkThistle border-t-20 border-thistlePurple py-20">
      <div className="container mx-auto px-5">
        <div className="py-10 flex flex-col lg:flex-row items-center justify-end">
          {/* Footer Text */}
          <div className="text-xl text-white lg:w-1/2 text-right">
            <p className="mb-1">
              Designed by <strong>Esther Bayer</strong> using Next.js, React, and Contentful.
            </p>
            <p className="font-bold">
              Get in touch: 
              <a href="mailto:hello@estherbayer.com" className="hover:underline hover:text-thistle ml-1">
                hello@estherbayer.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
