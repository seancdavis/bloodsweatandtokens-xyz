import { useState } from 'react';
import { IconAudio, IconVideo } from '../brand/icons';

type MediaMode = 'audio' | 'video';

type EpisodeMediaPlayerProps = {
  id?: string;
  episodeCode: string;
  /** Used only for the accessible label — the visible title lives in the page above the player. */
  title: string;
  audioUrl: string;
  videoId: string;
  defaultMode?: MediaMode;
};

const METER_BARS = 7;

export function EpisodeMediaPlayer({
  id,
  episodeCode,
  title,
  audioUrl,
  videoId,
  defaultMode = 'audio',
}: EpisodeMediaPlayerProps) {
  const [mode, setMode] = useState<MediaMode>(defaultMode);
  const [playing, setPlaying] = useState(false);
  const isAudio = mode === 'audio';
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

  return (
    <section
      className={`player${playing && isAudio ? ' is-playing' : ''}`}
      id={id}
      aria-label={`Player — ${title} (Ep ${episodeCode})`}
    >
      <div className="player__modes" role="group" aria-label="Choose media type">
        <button type="button" className="player__mode" aria-pressed={isAudio} onClick={() => setMode('audio')}>
          <IconAudio />
          Audio
        </button>
        <button type="button" className="player__mode" aria-pressed={!isAudio} onClick={() => setMode('video')}>
          <IconVideo />
          YouTube
        </button>
      </div>

      <div className="player__stage">
        {isAudio ? (
          <div className="player__audio">
            <div className="player__meter" aria-hidden="true">
              {Array.from({ length: METER_BARS }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <audio
              controls
              preload="metadata"
              src={audioUrl}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            >
              <a href={audioUrl}>Download the episode audio</a>
            </audio>
          </div>
        ) : (
          <iframe
            title={`YouTube video for ${title}`}
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}
