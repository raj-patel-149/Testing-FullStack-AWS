import "./globals.css";

export const metadata = {
  title: "Simple Blog App",
  description: "A simple full-stack blog application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
