import type { Metadata } from "next";
import { Kanit, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { FloatingWhatsAppQR } from "@/components/ui/FloatingWhatsAppQR";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const kanit = Kanit({
  weight: ["500"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MercadoCorp | Automatización, IA y Software a Medida para Empresas",
  description:
    "Consultora tecnológica B2B en Ecuador. Agentes de IA, automatización de procesos y software a medida para empresas que quieren escalar sin fricción. Diagnóstico gratis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${kanit.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||!t){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}var l=localStorage.getItem('mercadocorp_locale');if(l){document.documentElement.lang=l;}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <ScrollProgress />
            {children}
            <FloatingWhatsAppQR />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
