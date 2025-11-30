import { useEffect } from 'react';

const DEFAULT_TITLE = 'ApsnyTravel';

export function usePageTitle(title?: string) {
  useEffect(() => {
    const nextTitle = title ? `${title} — ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = nextTitle;
  }, [title]);
}
