type PodcastMarkProps = {
  compact?: boolean;
};

export function PodcastMark({ compact = false }: PodcastMarkProps) {
  return (
    <a className={`podcast-mark${compact ? ' podcast-mark--compact' : ''}`} href="/" aria-label="Blood, Sweat & Tokens home">
      <span aria-hidden="true">BST</span>
    </a>
  );
}
