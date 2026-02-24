import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Postpartum Growth MVP',
  description: 'Lightweight planner for postpartum growth modules.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-4xl p-6">{children}</main>
      </body>
    </html>
  );
}
