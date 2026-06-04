import type { Episode } from '../../data/podcast';
import { durationClock, episodeCode, episodePath, formatEpisodeListDate } from '../../data/podcast';

type EpisodeListProps = {
  episodes: Episode[];
  heading?: string;
  limit?: number;
};

export function EpisodeList({ episodes, heading = 'recent episodes', limit }: EpisodeListProps) {
  const visibleEpisodes = typeof limit === 'number' ? episodes.slice(0, limit) : episodes;

  return (
    <section className="episode-list" aria-labelledby="episode-list-heading">
      <div className="terminal-command">bst@pressure:~$ ls -l episodes/ // {episodes.length} total</div>
      <div className="section-heading">
        <p id="episode-list-heading">{heading}</p>
        <a href="/episodes/">browse all</a>
      </div>
      <ol>
        {visibleEpisodes.map((episode) => (
          <li key={episode.id}>
            <a className="episode-row" href={episodePath(episode)}>
              <span className="episode-row__number">{episodeCode(episode)}</span>
              <span className="episode-row__title">{episode.shortTitle}</span>
              <span className="episode-row__meta">{formatEpisodeListDate(episode.publishedAt)}</span>
              <span className="episode-row__duration">{durationClock(episode.duration)}</span>
              <span className="episode-row__play" aria-hidden="true">
                play
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
