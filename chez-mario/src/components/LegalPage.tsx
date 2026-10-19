export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container-x max-w-3xl pb-24 pt-32 md:pt-40">
      <h1 className="display outlined mb-10 text-[clamp(2.6rem,9vw,4.5rem)] text-white">{title}</h1>
      <div className="card space-y-8 p-6 text-ink-soft md:p-10 [&_a]:font-bold [&_a]:text-royal [&_a]:underline [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:uppercase [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:mt-1 [&_p+p]:mt-3">{children}</div>
    </div>
  );
}
