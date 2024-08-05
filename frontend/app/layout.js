import "./globals.css";
import RootComponent from "@/components/RootComponent";

export const metadata = {
  title: "API sécurisée",
  description: "Un site pour un test technique",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RootComponent>
        {children}
      </RootComponent>
    </html>
  );
}
