import type { Host } from '../../data/podcast';

type HostGridProps = {
  hosts: Host[];
};

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
}

export function HostGrid({ hosts }: HostGridProps) {
  return (
    <section className="hosts" id="hosts" aria-labelledby="hosts-heading">
      <div className="section-head">
        <h2 className="section-head__title" id="hosts-heading">
          Who is in the room
        </h2>
        <span className="section-head__aside">2 builders</span>
      </div>
      <div className="host-grid">
        {hosts.map((host) => (
          <article className="host" key={host.name}>
            <div className="host__mark" aria-hidden="true">
              {initials(host.name)}
            </div>
            <div>
              <h3 className="host__name">{host.name}</h3>
              <p className="host__role">{host.role}</p>
              <p className="host__bio">{host.bio}</p>
              <div className="host__links">
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
