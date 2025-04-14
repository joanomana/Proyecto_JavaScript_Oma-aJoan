
import "./globals.css";



export const metadata = {
  title: "D & G Wiki",
  description: "Create your own D&D character",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
