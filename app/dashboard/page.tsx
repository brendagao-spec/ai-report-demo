import { prisma } from '@/lib/prisma';
import { MODULES } from '@/lib/modules';

function getPhase(day: number, total: number) {
  const ratio = day / total;
  if (ratio <= 0.25) return '恢复启动';
  if (ratio <= 0.5) return '节律建立';
  if (ratio <= 0.75) return '稳定提升';
  return '复盘冲刺';
}

export default async function DashboardPage() {
  const settings = await prisma.userSettings.findUnique({ where: { id: 1 } });

  const totalEntries = await prisma.moduleEntry.count();
  const moduleCount = await prisma.moduleEntry.groupBy({ by: ['module'], _count: true });

  let cycleDay: number | null = null;
  let phase = '未设置周期';

  if (settings) {
    const diffMs = Date.now() - settings.startDate.getTime();
    const passedDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    cycleDay = (passedDays % settings.cycleLength) + 1;
    phase = getPhase(cycleDay, settings.cycleLength);
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-3xl font-bold">产后成长管理 MVP</h1>
        <p className="mt-2 text-slate-600">查看当前周期状态和各模块执行情况。</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">当前周期状态</h2>
          {settings ? (
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>当前第 {cycleDay} 天</li>
              <li>当前阶段：{phase}</li>
              <li>周期总天数：{settings.cycleLength} 天</li>
              <li>开始日期：{settings.startDate.toISOString().slice(0, 10)}</li>
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">请先在设置页配置周期总天数和开始日期。</p>
          )}
        </article>

        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">模块执行总览</h2>
          <p className="mt-2 text-sm text-slate-600">累计记录 {totalEntries} 条。</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700">
            {MODULES.map((module) => {
              const count = moduleCount.find((item) => item.module === module.type)?._count ?? 0;
              return (
                <li key={module.slug}>
                  {module.name}：<strong>{count}</strong> 条
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </div>
  );
}
