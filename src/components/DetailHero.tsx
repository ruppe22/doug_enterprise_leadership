import Image from "next/image";

export function DetailHero(props: {
  kicker?: string;
  title: string;
  lede?: string;
  imageSrc?: string | null;
  imageAlt?: string;
}) {
  const { kicker, title, lede, imageSrc, imageAlt = "" } = props;

  return (
    <section className="page-hero">
      <div className="page-hero__inner">
        <div className="detail-heroGrid">
          <div className="detail-heroMain">
            {kicker ? <div className="page-hero__kicker">{kicker}</div> : null}
            <h1 className="page-hero__title">{title}</h1>
            {lede ? <p className="page-hero__lede">{lede}</p> : null}
          </div>

          {imageSrc ? (
            <div className="detail-heroMedia">
              <div className="detail-heroImage">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
