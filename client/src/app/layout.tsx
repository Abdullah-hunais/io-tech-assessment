import "./globals.css";
import { Providers } from "../lib/redux/Provider";

export const metadata = {
  title: "Al Safar & Partners - Legal Consultants",
  description:
    "Al Safar & Partners offers comprehensive legal and business consulting services in UAE. Specializing in foreign investment, contracts, and notarization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-sans antialiased text-foreground bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
