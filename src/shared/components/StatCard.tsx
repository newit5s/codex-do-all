interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export const StatCard = ({ title, value, description }: StatCardProps) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
    <p className="text-sm text-slate-400">{title}</p>
    <p className="mt-2 text-2xl font-semibold text-brand-200">{value}</p>
    {description ? <p className="text-xs text-slate-500">{description}</p> : null}
  </div>
);
