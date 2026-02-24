import Link from 'next/link';
import { MODULES } from '@/lib/modules';

export default function ModulesPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">模块总览</h1>
      <p className="mb-6 text-slate-600">进入任一模块填写今日状态并查看最近 14 天历史记录。</p>

      <div className="grid gap-4 md:grid-cols-2">
        {MODULES.map((module) => (
          <article key={module.slug} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">{module.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{module.description}</p>
            <Link href={`/modules/${module.slug}`} className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-500">
              进入模块 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
