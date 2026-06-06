import { DropsMark } from '../brand/DropsMark';

export function PodcastMark() {
  return (
    <a className="brand" href="/" aria-label="Blood, Sweat & Tokens home">
      <DropsMark className="brand__drops" />
    </a>
  );
}
