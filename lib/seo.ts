import { useEffect } from 'react';
import { branding } from './branding';

export interface OpenGraphMeta {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'profile';
  url?: string;
  image?: string;
  siteName?: string;
}

export interface PageMeta {
  title?: string;
  description?: string;
  canonicalPath?: string;
  openGraph?: OpenGraphMeta;
}

const DEFAULT_TITLE = branding.brandName;
const DEFAULT_DESCRIPTION = branding.siteTagline;

function upsertMetaTag(attribute: 'name' | 'property', key: string, content?: string) {
  if (!content) return;

  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function setCanonicalTag(url?: string) {
  if (!url) return;

  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

function getAbsoluteUrl(path?: string) {
  if (typeof window === 'undefined') return undefined;
  if (!path) return window.location.href;
  return new URL(path, window.location.origin).toString();
}

export function usePageMeta(meta?: PageMeta) {
  useEffect(() => {
    const effectiveTitle = meta?.title ? `${meta.title} — ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    const description = meta?.description ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = getAbsoluteUrl(meta?.canonicalPath);

    document.title = effectiveTitle;
    upsertMetaTag('name', 'description', description);
    setCanonicalTag(canonicalUrl);

    const ogTitle = meta?.openGraph?.title ?? meta?.title ?? DEFAULT_TITLE;
    const ogDescription = meta?.openGraph?.description ?? description;
    const ogType = meta?.openGraph?.type ?? (meta?.canonicalPath ? 'article' : 'website');
    const ogUrl = meta?.openGraph?.url ?? canonicalUrl;
    const ogImage = meta?.openGraph?.image;
    const siteName = meta?.openGraph?.siteName ?? branding.brandName;

    upsertMetaTag('property', 'og:title', ogTitle);
    upsertMetaTag('property', 'og:description', ogDescription);
    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:url', ogUrl);
    upsertMetaTag('property', 'og:site_name', siteName);
    upsertMetaTag('property', 'og:image', ogImage);

    const twitterCard = ogImage ? 'summary_large_image' : 'summary';
    upsertMetaTag('name', 'twitter:card', twitterCard);
    upsertMetaTag('name', 'twitter:title', ogTitle);
    upsertMetaTag('name', 'twitter:description', ogDescription);
  }, [
    meta?.title,
    meta?.description,
    meta?.canonicalPath,
    meta?.openGraph?.title,
    meta?.openGraph?.description,
    meta?.openGraph?.type,
    meta?.openGraph?.url,
    meta?.openGraph?.image,
    meta?.openGraph?.siteName,
  ]);
}
