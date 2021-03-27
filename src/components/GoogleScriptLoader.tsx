import React from 'react';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function loadScript(
  src: string,
  position: HTMLElement | null,
  id: string,
  onLoad: () => void
) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  script.onload = onLoad;
  position.appendChild(script);
}

export default function GoogleScriptLoader({
  children,
  loaded,
  onLoad,
}: React.PropsWithChildren<{ loaded: boolean; onLoad: () => void }>) {
  if (typeof window !== 'undefined' && !loaded) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
        onLoad
      );
    }
  }

  return loaded ? <>{children}</> : null;
}
