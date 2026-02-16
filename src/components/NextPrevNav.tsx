import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
  title: string;
  meta?: string;
};

export function NextPrevNav({
  newer,
  older,
  className,
}: {
  newer?: NavItem | null;
  older?: NavItem | null;
  className?: string;
}) {
  if (!newer && !older) return null;

  return (
    <nav className={`nextprev ${className ?? ""}`} aria-label="Article navigation">
      {newer ? (
        <Link href={newer.href} className="nextprev__link nextprev__link--newer">
          <div className="nextprev__label">← {newer.label}</div>
          <div className="nextprev__title">{newer.title}</div>
          {newer.meta ? <div className="nextprev__meta">{newer.meta}</div> : null}
        </Link>
      ) : (
        <div />
      )}

      {older ? (
        <Link href={older.href} className="nextprev__link nextprev__link--older">
          <div className="nextprev__label">{older.label} →</div>
          <div className="nextprev__title">{older.title}</div>
          {older.meta ? <div className="nextprev__meta">{older.meta}</div> : null}
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
