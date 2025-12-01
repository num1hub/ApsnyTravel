import { useEffect, useMemo } from 'react';
import { branding } from './branding';

export interface OpenGraphMeta {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
}

export interface PageMeta {
  title?: string;
  description?: string;
  path?: string;
  openGraph?: OpenGraphMeta;
}

const DEFAULT_TITLE = branding.siteName;
const DEFAULT_DESCRIPTION = branding.defaultDescription;
const DEFAULT_OG_TYPE = 'website';

function upsertMetaTag(selector: string, attributes: Record<string, string | undefined>) {
  const head = document.head;
  let element = head.querySelector<HTMLMetaElement>(selector);

  const content = attributes.content;

  if (!content) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      if (value) {
        element?.setAttribute(key, value);
      }
    });
    head.appendChild(element);
    return;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      element?.setAttribute(key, value);
    }
  });
}

function upsertLinkTag(rel: string, href?: string) {
  const head = document.head;
  let element = head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!href) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function resolveUrl(path?: string) {
  if (typeof window === 'undefined') return path;
  const base = window.location.origin;
  if (!path) return window.location.href;
  try {
    return new URL(path, base).toString();
  } catch (error) {
    console.warn('Failed to resolve canonical URL', error);
    return window.location.href;
  }
}

export function usePageMeta(meta?: PageMeta) {
  const resolvedMeta = useMemo(() => {
    const title = meta?.title ? `${meta.title} — ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    const description = meta?.description ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = resolveUrl(meta?.path);

    const og: OpenGraphMeta = {
      title,
      description,
      type: meta?.openGraph?.type ?? DEFAULT_OG_TYPE,
      url: meta?.openGraph?.url ?? canonicalUrl,
      image: meta?.openGraph?.image,
    };

    return { title, description, canonicalUrl, openGraph: og };
  }, [meta?.description, meta?.openGraph?.image, meta?.openGraph?.type, meta?.openGraph?.url, meta?.path, meta?.title]);

  useEffect(() => {
    document.title = resolvedMeta.title;

    upsertMetaTag('meta[name="description"]', {
      name: 'description',
      content: resolvedMeta.description,
    });

    upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: resolvedMeta.openGraph.title });
    upsertMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: resolvedMeta.openGraph.description,
    });
    upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: resolvedMeta.openGraph.type });
    upsertMetaTag('meta[property="og:url"]', { property: 'og:url', content: resolvedMeta.openGraph.url });
    upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: resolvedMeta.openGraph.image });

    upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: resolvedMeta.openGraph.title });
    upsertMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: resolvedMeta.openGraph.description,
    });
    upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: resolvedMeta.openGraph.image });

    upsertLinkTag('canonical', resolvedMeta.canonicalUrl);
  }, [resolvedMeta]);
}

export function usePageTitle(title?: string) {
  usePageMeta({ title });
}
