import { useState } from 'react';

type MediaMode = 'audio' | 'video';

type EpisodeMediaPlayerProps = {
  id?: string;
  episodeCode: string;
  title: string;
  duration: string;
  audioUrl: string;
  videoId: string;
  defaultMode?: MediaMode;
};

export function EpisodeMediaPlayer({
  id,
  episodeCode,
  title,
  duration,
  audioUrl,
  videoId,
  defaultMode = 'audio',
}: EpisodeMediaPlayerProps) {
  const [mode, setMode] = useState<MediaMode>(defaultMode);
  const isAudio = mode === 'audio';
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

  return (
    <section className="player" id={id} aria-labelledby={`${id ?? episodeCode}-media-title`}>
      <div className="player__head">
        <div>
          <p className="player__eyebrow">Now playing · Ep {episodeCode}</p>
          <h2 className="player__title" id={`${id ?? episodeCode}-media-title`}>
            {title}
          </h2>
        </div>
        <span className="player__dur">{duration}</span>
      </div>

      <div className="player__modes" role="group" aria-label="Choose media type">
        <button type="button" className="player__mode" aria-pressed={isAudio} onClick={() => setMode('audio')}>
          Audio
        </button>
        <button type="button" className="player__mode" aria-pressed={!isAudio} onClick={() => setMode('video')}>
          YouTube
        </button>
      </div>

      <div className="player__stage">
        {isAudio ? (
          <div className="player__audio">
            <div className="player__meter" aria-hidden="true">
              <span />
            </div>
            <audio controls preload="metadata" src={audioUrl}>
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
