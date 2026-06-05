import { PodcastMark } from './PodcastMark';

type SiteHeaderProps = {
  currentPath: string;
};

const navItems = [
  { href: '/episodes/', label: 'Episodes' },
  { href: '/about/', label: 'About' },
  { href: '#subscribe', label: 'Subscribe' },
];

function isActive(currentPath: string, href: string) {
  if (href.startsWith('#')) return false;
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(href);
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="masthead">
      <div className="masthead__inner">
        <PodcastMark />
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} aria-current={isActive(currentPath, item.href) ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="masthead__cta">
          <a className="btn btn--blood" href="/episodes/">
            <span className="btn__tri" aria-hidden="true">
              ▶
            </span>
            Listen
          </a>
        </div>
      </div>
    </header>
  );
}
