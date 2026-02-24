import { Nav } from '@/components/nav';

export default function ReviewPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Review</h1>
      <p className="mb-6 text-slate-600">Weekly reflection prompts to keep momentum and spot improvements.</p>
      <Nav />

      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold">Weekly check-in</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Which module gave the biggest positive change this week?</li>
          <li>How is your energy between wake-up and bedtime?</li>
          <li>What support do you need for the next 7 days?</li>
        </ul>
      </section>
    </div>
  );
}
