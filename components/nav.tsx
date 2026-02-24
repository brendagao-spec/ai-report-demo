import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/settings', label: 'Settings' },
  { href: '/modules', label: 'Modules' },
  { href: '/review', label: 'Review' }
];

export function Nav() {
  return (
    <nav className="mb-8 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-brand-100 hover:text-brand-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
