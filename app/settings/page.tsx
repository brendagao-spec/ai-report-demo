import { Nav } from '@/components/nav';
import { prisma } from '@/lib/prisma';

async function updateSettings(formData: FormData) {
  'use server';

  const cycleLength = Number(formData.get('cycleLength'));
  const startDate = String(formData.get('startDate'));

  if (!Number.isFinite(cycleLength) || cycleLength < 20 || cycleLength > 45) {
    throw new Error('Cycle length must be between 20 and 45 days.');
  }

  if (!startDate) {
    throw new Error('Start date is required.');
  }

  await prisma.userSettings.upsert({
    where: { id: 1 },
    update: { cycleLength, startDate: new Date(startDate) },
    create: { id: 1, cycleLength, startDate: new Date(startDate) }
  });
}

export default async function SettingsPage() {
  const settings = await prisma.userSettings.findUnique({ where: { id: 1 } });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Settings</h1>
      <p className="mb-6 text-slate-600">Set your cycle baseline to personalize the plan.</p>
      <Nav />

      <form action={updateSettings} className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div>
          <label htmlFor="cycleLength" className="mb-1 block text-sm font-medium text-slate-700">
            Cycle length (days)
          </label>
          <input
            id="cycleLength"
            name="cycleLength"
            type="number"
            min={20}
            max={45}
            required
            defaultValue={settings?.cycleLength ?? 28}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="mb-1 block text-sm font-medium text-slate-700">
            Start date
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
          Save settings
        </button>
      </form>
    </div>
  );
}
