import type { PlatformLink } from '../../data/podcast';
import { PodcastMark } from './PodcastMark';

type SiteFooterProps = {
  links: PlatformLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="site-footer" id="subscribe">
      <div className="site-footer__command">bst@pressure:~$ subscribe --platform</div>
      <nav className="site-footer__links" aria-label="Podcast and company links">
        {links.map((link) => (
          <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </nav>
      <PodcastMark compact />
    </footer>
  );
}
