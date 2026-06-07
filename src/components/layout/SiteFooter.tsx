import type { PlatformLink } from '../../data/podcast';
import { BoarMark } from '../brand/BoarMark';

type SiteFooterProps = {
  links: PlatformLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="footer" id="subscribe">
      <a className="footer__brand" href="/" aria-label="Blood, Sweat & Tokens home">
        <BoarMark className="footer__boar" />
        <span className="footer__word">
          Blood,
          <br />
          Sweat
          <b>&nbsp;&amp;</b>
          <br />
          Tokens
        </span>
      </a>
      <nav className="footer__links" aria-label="Podcast and company links">
        {links.map((link) => (
          <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
