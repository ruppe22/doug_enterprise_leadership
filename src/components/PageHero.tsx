export function PageHero(props: {
  kicker?: string;
  title: string;
  lede?: string;
}) {
  const { kicker, title, lede } = props;

  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        {kicker ? <div className="page-hero__kicker">{kicker}</div> : null}
        <h1 className="page-hero__title">{title}</h1>
        {lede ? <p className="page-hero__lede">{lede}</p> : null}
      </div>
    </section>
  );
}
