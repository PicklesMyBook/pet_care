import "./globals.css";

export const metadata = {
  title: "PawCare 寵物照護",
  description: "PawCare 到府照護與日常健康管理",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
