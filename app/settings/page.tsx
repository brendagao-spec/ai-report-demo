import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function updateSettings(formData: FormData) {
  'use server';

  const cycleLength = Number(formData.get('cycleLength'));
  const startDate = String(formData.get('startDate'));

  if (!Number.isFinite(cycleLength) || cycleLength < 20 || cycleLength > 180) {
    throw new Error('周期总天数必须在 20 到 180 之间。');
  }

  if (!startDate) {
    throw new Error('开始日期不能为空。');
  }

  await prisma.userSettings.upsert({
    where: { id: 1 },
    update: { cycleLength, startDate: new Date(`${startDate}T00:00:00.000Z`) },
    create: { id: 1, cycleLength, startDate: new Date(`${startDate}T00:00:00.000Z`) }
  });

  revalidatePath('/settings');
  revalidatePath('/dashboard');
  revalidatePath('/review');
}

export default async function SettingsPage() {
  const settings = await prisma.userSettings.findUnique({ where: { id: 1 } });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">设置</h1>
      <p className="mb-6 text-slate-600">配置周期总天数和开始日期，所有统计会基于该周期自动计算。</p>

      <form action={updateSettings} className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div>
          <label htmlFor="cycleLength" className="mb-1 block text-sm font-medium text-slate-700">
            周期总天数
          </label>
          <input
            id="cycleLength"
            name="cycleLength"
            type="number"
            min={20}
            max={180}
            required
            defaultValue={settings?.cycleLength ?? 42}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="mb-1 block text-sm font-medium text-slate-700">
            开始日期
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            defaultValue={settings?.startDate.toISOString().slice(0, 10)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500">
          保存设置
        </button>
      </form>
    </div>
  );
}
