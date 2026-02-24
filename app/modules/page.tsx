import { Nav } from '@/components/nav';

const moduleCards = [
  {
    title: '1. Sleep Recovery',
    objective: 'Rebuild rest patterns with flexible nighttime and daytime strategies.'
  },
  {
    title: '2. Nutrition Reset',
    objective: 'Stabilize energy with balanced, low-effort postpartum meals.'
  },
  {
    title: '3. Gentle Movement',
    objective: 'Increase daily mobility and reduce stiffness safely.'
  },
  {
    title: '4. Core & Pelvic Floor',
    objective: 'Restore deep core awareness and strength progressively.'
  },
  {
    title: '5. Mindset & Identity',
    objective: 'Support confidence, stress regulation, and self-compassion.'
  },
  {
    title: '6. Connection & Support',
    objective: 'Strengthen routines with partner, community, and care-team support.'
  }
];

export default function ModulesPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Modules</h1>
      <p className="mb-6 text-slate-600">Six focused tracks for a practical postpartum growth journey.</p>
      <Nav />

      <div className="grid gap-4 md:grid-cols-2">
        {moduleCards.map((module) => (
          <article key={module.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">{module.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{module.objective}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
