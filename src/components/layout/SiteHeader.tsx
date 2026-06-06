import { useState } from 'react';
import { PodcastMark } from './PodcastMark';
import { IconPlay } from '../brand/icons';

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
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="masthead">
      <div className="masthead__inner">
        <PodcastMark />

        <button
          type="button"
          className="masthead__burger"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="masthead__burger-box" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav id="primary-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(currentPath, item.href) ? 'page' : undefined}
              onClick={close}
            >
              {item.label}
            </a>
          ))}
          <a className="btn btn--blood nav__listen" href="/episodes/" onClick={close}>
            <IconPlay />
            Listen
          </a>
        </nav>
      </div>
    </header>
  );
}
