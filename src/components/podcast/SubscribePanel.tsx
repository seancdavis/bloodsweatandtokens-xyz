import type { PlatformLink } from '../../data/podcast';

type SubscribePanelProps = {
  links: PlatformLink[];
};

export function SubscribePanel({ links }: SubscribePanelProps) {
  return (
    <section className="subscribe-panel" aria-labelledby="subscribe-heading">
      <div>
        <p className="terminal-command">bst@pressure:~$ subscribe --platform</p>
        <h2 id="subscribe-heading">Pick your pressure vessel.</h2>
      </div>
      <div className="subscribe-panel__links">
        {links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
