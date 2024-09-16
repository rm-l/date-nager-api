import "./globals.css";

export const metadata = {
  title: "Date Nager API",
  description: "DevelopsToday Assessment: ",
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
