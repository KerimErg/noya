export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container-x max-w-3xl pb-24 pt-32 md:pt-40">
      <h1 className="display mb-10 text-[clamp(2.6rem,9vw,4.5rem)]">{title}</h1>
      <div className="space-y-8 text-cream/85 [&_a]:text-coin [&_a]:underline [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-black [&_h2]:uppercase [&_h2]:text-cream [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3">{children}</div>
    </div>
  );
}
