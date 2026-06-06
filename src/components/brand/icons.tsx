type IconProps = {
  className?: string;
};

/** Solid play triangle. Used in buttons and the episode list. */
export function IconPlay({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 10 12" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M0 0L10 6L0 12V0Z" />
    </svg>
  );
}

/** Waveform bars — the audio mode. */
export function IconAudio({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 12" fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="0" y="4" width="2" height="4" />
      <rect x="4" y="1.5" width="2" height="9" />
      <rect x="8" y="3" width="2" height="6" />
      <rect x="12" y="0" width="2" height="12" />
    </svg>
  );
}

/** Screen with a play triangle — the video mode. */
export function IconVideo({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 12" fill="none" aria-hidden="true" focusable="false">
      <rect x="0.75" y="0.75" width="14.5" height="10.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 3.5L10.5 6L6 8.5V3.5Z" fill="currentColor" />
    </svg>
  );
}
