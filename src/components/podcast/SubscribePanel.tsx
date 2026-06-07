import type { PlatformLink } from '../../data/podcast';

type SubscribePanelProps = {
  links: PlatformLink[];
};

export function SubscribePanel({ links }: SubscribePanelProps) {
  return (
    <section className="subscribe" aria-labelledby="subscribe-heading">
      <div>
        <p className="label label--blood">Subscribe</p>
        <h2 className="subscribe__title" id="subscribe-heading">
          Pick your
          <br />
          pressure vessel.
        </h2>
      </div>
      <div className="subscribe__links">
        {links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
