'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/settings', label: 'Settings' },
  { href: '/modules/body', label: '身体恢复' },
  { href: '/modules/milk', label: '母乳与精力' },
  { href: '/modules/learning', label: '学习结构' },
  { href: '/modules/emotion', label: '情绪稳定' },
  { href: '/modules/multichild', label: '多娃适应' },
  { href: '/modules/growth', label: '能力升级' },
  { href: '/review', label: '复盘' }
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 lg:w-64">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">导航</h2>
      <ul className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  active ? 'bg-brand-100 font-medium text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
