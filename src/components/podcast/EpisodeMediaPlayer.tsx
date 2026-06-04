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
    <section className="media-player" id={id} aria-labelledby={`${id ?? episodeCode}-media-title`}>
      <div className="media-player__header">
        <div>
          <p className="terminal-command">bst@pressure:~$ cat episodes/{episodeCode}.txt</p>
          <p className="media-player__eyebrow">latest · ep {episodeCode}</p>
          <h2 id={`${id ?? episodeCode}-media-title`}>{title}</h2>
        </div>
        <span className="media-player__duration">{duration}</span>
      </div>

      <div className="media-player__switcher" role="group" aria-label="Choose media type">
        <button type="button" aria-pressed={isAudio} onClick={() => setMode('audio')}>
          audio
        </button>
        <button type="button" aria-pressed={!isAudio} onClick={() => setMode('video')}>
          youtube
        </button>
      </div>

      <div className="media-player__stage">
        {isAudio ? (
          <div className="media-player__audio">
            <div className="media-player__meter" aria-hidden="true">
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
