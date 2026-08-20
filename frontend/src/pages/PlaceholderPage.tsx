type PlaceholderPageProps = {
  title: string;
  description: string;
};
import { tr } from "@/i18n/tr";
export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <section>
      <p className="text-sm font-medium text-primary">{tr.common.appName}</p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>

      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {description}
      </p>

      <div className="mt-8 rounded-2xl border border-dashed bg-card p-10 text-center">
        <p className="text-sm font-medium">{title}</p>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {tr.placeholder.moduleComingSoon}
        </p>
      </div>
    </section>
  );
}
