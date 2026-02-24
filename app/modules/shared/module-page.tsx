import { saveModuleEntry } from '@/app/modules/actions';
import { prisma } from '@/lib/prisma';
import { ModuleMeta } from '@/lib/modules';

function formatDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

type Props = {
  module: ModuleMeta;
};

export async function ModulePage({ module }: Props) {
  const history = await prisma.moduleEntry.findMany({
    where: { module: module.type },
    orderBy: { date: 'desc' },
    take: 14
  });

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-bold">{module.name}</h1>
        <p className="mt-2 text-sm text-slate-600">{module.description}</p>
      </header>

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">今日填写表单</h2>
        <form action={saveModuleEntry} className="mt-4 grid gap-4 md:grid-cols-2">
          <input type="hidden" name="slug" value={module.slug} />

          <div>
            <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-700">
              日期
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={today}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="score" className="mb-1 block text-sm font-medium text-slate-700">
              今日评分（1-5）
            </label>
            <input
              id="score"
              name="score"
              type="number"
              min={1}
              max={5}
              defaultValue={3}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="note" className="mb-1 block text-sm font-medium text-slate-700">
              备注
            </label>
            <textarea
              id="note"
              name="note"
              rows={4}
              placeholder="记录今天的关键观察..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500">
              保存记录
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">最近 14 天历史记录</h2>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">还没有记录，先填写今天的数据吧。</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {history.map((item) => (
              <li key={item.id} className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="font-medium">
                  {formatDate(item.date)} · 评分 {item.score ?? '-'}
                </div>
                <p className="mt-1 text-slate-600">{item.note || '（无备注）'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
