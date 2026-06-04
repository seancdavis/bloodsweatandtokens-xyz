import type { Host } from '../../data/podcast';

type HostGridProps = {
  hosts: Host[];
};

export function HostGrid({ hosts }: HostGridProps) {
  return (
    <section className="host-section" id="hosts" aria-labelledby="hosts-heading">
      <div className="section-heading">
        <p id="hosts-heading">who is in the room</p>
        <span>2 builders</span>
      </div>
      <div className="host-grid">
        {hosts.map((host) => (
          <article className="host-card" key={host.name}>
            <div className="host-card__sigil" aria-hidden="true">
              {host.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <h3>{host.name}</h3>
              <p className="host-card__role">{host.role}</p>
              <p>{host.bio}</p>
              <div className="host-card__links">
                {host.links.map((link) => (
                  <a key={`${host.name}-${link.label}`} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
