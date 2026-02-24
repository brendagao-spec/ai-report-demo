import { Nav } from '@/components/nav';
import { prisma } from '@/lib/prisma';

const modules = [
  'Sleep Recovery',
  'Nutrition Reset',
  'Gentle Movement',
  'Core & Pelvic Floor',
  'Mindset & Identity',
  'Connection & Support'
];

export default async function DashboardPage() {
  const settings = await prisma.userSettings.findUnique({ where: { id: 1 } });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Postpartum Growth MVP</h1>
      <p className="mb-6 text-slate-600">
        Track your cycle and move through six lightweight recovery modules.
      </p>
      <Nav />

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Current setup</h2>
          {settings ? (
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>
                Cycle length: <strong>{settings.cycleLength} days</strong>
              </li>
              <li>
                Cycle start date: <strong>{settings.startDate.toISOString().slice(0, 10)}</strong>
              </li>
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              No cycle settings saved yet. Visit Settings to configure your baseline.
            </p>
          )}
        </article>

        <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold">Module progress</h2>
          <p className="mt-2 text-sm text-slate-600">6 modules ready for review:</p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {modules.map((module) => (
              <li key={module}>{module}</li>
            ))}
          </ol>
        </article>
      </section>
    </div>
  );
}
