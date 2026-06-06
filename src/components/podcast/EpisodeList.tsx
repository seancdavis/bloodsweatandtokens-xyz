import type { Episode } from '../../data/podcast';
import { durationClock, episodeCode, episodePath, formatEpisodeListDate } from '../../data/podcast';
import { IconPlay } from '../brand/icons';

type EpisodeListProps = {
  episodes: Episode[];
  heading?: string;
  limit?: number;
};

export function EpisodeList({ episodes, heading = 'Recent episodes', limit }: EpisodeListProps) {
  const isLimited = typeof limit === 'number' && limit < episodes.length;
  const visibleEpisodes = typeof limit === 'number' ? episodes.slice(0, limit) : episodes;

  return (
    <section className="episodes" aria-labelledby="episode-list-heading">
      <div className="section-head">
        <h2 className="section-head__title" id="episode-list-heading">
          {heading}
        </h2>
        <span className="section-head__aside">
          {isLimited ? <a href="/episodes/">All {episodes.length} →</a> : `${episodes.length} total`}
        </span>
      </div>
      <ol>
        {visibleEpisodes.map((episode) => (
          <li key={episode.id}>
            <a className="episode" href={episodePath(episode)}>
              <span className="episode__no">{episodeCode(episode)}</span>
              <span className="episode__title">{episode.shortTitle}</span>
              <span className="episode__date">{formatEpisodeListDate(episode.publishedAt)}</span>
              <span className="episode__dur">{durationClock(episode.duration)}</span>
              <span className="episode__play" aria-hidden="true">
                <IconPlay />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
