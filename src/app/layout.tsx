import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SplashScreen from "@/components/splash-screen";
import MusicPlayer from "@/components/music-player";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nadhif A.W | Junior Web Developer & Creative Designer",
  description: "Elite personal portfolio of Nadhif A.W. showcasing high-end web experiences, interactive designs, and modern fullstack technology stacks combining Neo-Brutalism and luxurious Gen-Z aesthetics.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Frontend Developer", "Creative Web Design", "Portfolio"],
  authors: [{ name: "Nadhif A.W." }],
  openGraph: {
    title: "Nadhif A.W | Junior Web Developer & Creative Designer",
    description: "Elite personal portfolio showcasing high-end web experiences, interactive designs, and modern tech stacks.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen relative overflow-x-hidden selection:bg-lime-green selection:text-black">

        <div className="grain-overlay" />

        <ThemeProvider>
          <SplashScreen />
          <div className="relative flex flex-col min-h-screen">
            {children}
          </div>
          <MusicPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
