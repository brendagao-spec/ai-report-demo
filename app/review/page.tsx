import { prisma } from '@/lib/prisma';
import { MODULES } from '@/lib/modules';

function startOfDay(input: Date) {
  return new Date(`${input.toISOString().slice(0, 10)}T00:00:00.000Z`);
}

export default async function ReviewPage() {
  const settings = await prisma.userSettings.findUnique({ where: { id: 1 } });

  if (!settings) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold">复盘</h1>
        <p className="mt-3 text-sm text-slate-600">请先去设置页完成周期配置，再查看周期统计。</p>
      </div>
    );
  }

  const cycleStart = startOfDay(settings.startDate);
  const cycleEnd = new Date(cycleStart);
  cycleEnd.setUTCDate(cycleEnd.getUTCDate() + settings.cycleLength - 1);

  const entries = await prisma.moduleEntry.findMany({
    where: {
      date: {
        gte: cycleStart,
        lte: cycleEnd
      }
    }
  });

  const totalPossible = settings.cycleLength * MODULES.length;
  const completionRate = totalPossible === 0 ? 0 : Math.round((entries.length / totalPossible) * 100);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-bold">复盘</h1>
        <p className="mt-2 text-sm text-slate-600">统计当前周期内的执行情况，帮助下一周期优化计划。</p>
      </header>

      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">周期统计</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          <li>周期范围：{cycleStart.toISOString().slice(0, 10)} ~ {cycleEnd.toISOString().slice(0, 10)}</li>
          <li>总记录数：{entries.length}</li>
          <li>计划记录数：{totalPossible}</li>
          <li>完成率：{completionRate}%</li>
        </ul>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">各模块条目数</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          {MODULES.map((module) => {
            const count = entries.filter((entry) => entry.module === module.type).length;
            return (
              <li key={module.slug}>
                {module.name}：{count} 条
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
