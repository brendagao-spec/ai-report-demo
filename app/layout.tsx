import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/nav';

export const metadata: Metadata = {
  title: '产后成长管理 MVP',
  description: '围绕周期、模块记录与复盘的轻量管理工具。'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-slate-50">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-6 lg:flex-row">
          <Nav />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
