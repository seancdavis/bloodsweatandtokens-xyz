import { PodcastMark } from './PodcastMark';

type SiteHeaderProps = {
  currentPath: string;
};

const navItems = [
  { href: '/episodes/', label: 'episodes' },
  { href: '/about/', label: 'about' },
  { href: '#subscribe', label: 'subscribe' },
];

function isActive(currentPath: string, href: string) {
  if (href.startsWith('#')) return false;
  return currentPath === href || currentPath.startsWith(href);
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="terminal-bar" aria-hidden="true">
        <div className="terminal-lights">
          <span />
          <span />
          <span />
        </div>
        <span>bst@pressure - bash - 132x40</span>
        <span>P1/phosphor</span>
      </div>

      <div className="site-header__inner">
        <PodcastMark compact />
        <nav className="site-nav" aria-label="Primary navigation">
          <span aria-hidden="true">[</span>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} aria-current={isActive(currentPath, item.href) ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
          <span aria-hidden="true">]</span>
        </nav>
        <a className="terminal-command terminal-command--right" href="/episodes/">
          ls episodes
        </a>
      </div>
    </header>
  );
}
